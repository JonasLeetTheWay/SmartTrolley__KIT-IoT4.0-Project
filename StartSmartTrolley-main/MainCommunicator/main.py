import paho.mqtt.client as mqtt
import json
import threading
import time

def main(): 

    server = "YOUR MQTT SERVER"
    port = "YOUR MQTT PORT"
    keepalive = 60
    topicToOdoo = "odoo/in"
    topicFromOdoo = "rpi/odoo/out"
    topicFromESP = "rpi/esp/out"
    topicFromObDet = "rpi/obdet/out" # Object Detection
    topicToObDet = "obdet/in"   

    dataESP = {"weight": 200}
    dataESPChanged = [True]
    lockESP = threading.Lock()
    dataOdoo = {"resultList": []}
    dataOdooChanged = [False]
    lockOdoo = threading.Lock()
    dataObDet = {"QrCode": "TrolleyNr: 3",
                 "label": "frontplatte"}
    dataObDetChanged = [True]
    lockObDet = threading.Lock()

    currentTrolleyId = [-1]

    def on_connect(client, userdata, flags, rc):
        print("Connected with result code "+str(rc))
        client.subscribe("rpi/#")
    def on_message(client, userdata, msg):
        payload = json.loads(str(msg.payload.decode("utf-8","ignore")))
        if (msg.topic == topicFromESP):
            with lockESP:
                updateData(dataESP, payload, dataESPChanged)
        elif (msg.topic == topicFromObDet):
            with lockObDet:
                updateData(dataObDet, payload, dataObDetChanged)
        elif (msg.topic == topicFromOdoo):
            with lockOdoo:
                if payload != True:
                    updateData(dataOdoo, {"resultList": payload}, dataOdooChanged)
        else: 
            print("""ERROR: i don't know topic: '""" + msg.topic + "' \npayload: " + str(msg.payload))
        
        #print("""topic: '""" + msg.topic + "' \npayload: " + str(msg.payload))

    def updateData(oldData, newData, changed):
        oldData.update(newData)
        changed[0] = True

    def scanTrolleyQR():
        cutAfter = "TrolleyNr: "
        cutAt = len(cutAfter)
        trolleyScanned= False
        print("Wait for TrolleyID")
        while not trolleyScanned:
            with lockObDet:
                print(dataObDet["QrCode"][:cutAt])
                if dataObDet["QrCode"][:cutAt] == "TrolleyNr: " and dataObDetChanged[0]:
                    currentTrolleyId[0] = int(dataObDet["QrCode"][cutAt:])
                    dataObDetChanged[0] = False
                    trolleyScanned = True
                    print("Got TrolleyID")
            time.sleep(0.1)
        
        
    def showMissingParts():
        objList = []
        continueThisTrolley=False

        client.publish(topicToOdoo, json.dumps({'modelName': 'x_lager.trolley',
                 'methodName': 'search_read',
                 'parametersArray': [[['x_trolleyID', '=', currentTrolleyId[0]]]],
                 'parametersDict':  {'fields': ['id', 'x_productID', 'x_productName', 'x_productCountRequested', 'x_productCount', 'x_pocket', 'x_productWeight']}}))
        
        gotData = False
        
        print("Wait for Odoo to get missing Parts")
        while not gotData:
            with lockOdoo:
                if dataOdooChanged[0]:
                    dataObDetChanged[0] = False
                    gotData = True
                    print("Got missing Parts")
                else: 
                    client.publish(topicToOdoo, json.dumps({'modelName': 'x_lager.trolley',
                        'methodName': 'search_read',
                        'parametersArray': [[['x_trolleyID', '=', currentTrolleyId[0]]]],
                        'parametersDict':  {'fields': ['id', 'x_productID', 'x_productName', 'x_productCountRequested', 'x_productCount', 'x_pocket', 'x_productWeight']}}))
            time.sleep(0.1)

        
        continueThisTrolley=False

        for product in dataOdoo["resultList"]:
            if product["x_productCount"] != product["x_productCountRequested"]:
                continueThisTrolley = True
            objList.append({"id": product["x_productID"],
            "name": product["x_productName"],
            "currentValue": product["x_productCount"],
            "value": product["x_productCountRequested"]
            })
        
        pushToObDet = {
            "trolley": currentTrolleyId[0],
            "entrys":    objList
        }
        client.publish(topicToObDet, json.dumps(pushToObDet))
        print("Published To Obdet")

        return continueThisTrolley
        
    

    def waitForDrop():
        wait = True
        print("Wait for Esp")
        while wait:
            with lockESP:
                if dataESPChanged[0]:
                    with lockObDet:
                        print("Wait for Obdet")
                        if len(dataObDet["label"]) > 0:
                            for product in dataOdoo["resultList"]:
                                if product["x_productName"] == dataObDet["label"]:
                                    id = product["id"]
                                    productWeight = product["x_productWeight"]
                                    break

                            
                            weight = dataESP["weight"]
                            print()
                            count = round(weight/productWeight)
                            client.publish(topicToOdoo, json.dumps({'modelName': 'x_lager.trolley',
                                'methodName': 'write',
                                'parametersArray': [[id], {'x_productCount':count}],
                                'parametersDict':  {}}))
                            wait = False
                            dataESPChanged[0] = False

            time.sleep(0.1)

    def mainRoutine():
        while True:
            scanTrolleyQR()
            while showMissingParts():
                waitForDrop()


    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(server, port, 60)

    client.loop_start()

    # above is all for initialization

    # below is where the communication relationship happen (MQTT - Odoo, Raspberry Pi, ESP32, Smart Glasses)
    threading.Thread(target=mainRoutine, daemon=True).start()
    exit = ""
    while exit != "e":
        exit = input("input e to exit\n")
    client.loop_stop()


if __name__ == '__main__':
    main()