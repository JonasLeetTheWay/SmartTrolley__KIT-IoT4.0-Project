import libraries
def main(): 
    mqttServer = "imi-i40-mqtt.imi.kit.edu"
    constants
    data

    client = mqtt.Client()
    client.on_message = updateData(oldData, message)
    client.connect(server, port, 60)
    client.loop_start()
    # init complete

    while scanTrolleyQR():    
        while showMissingParts():
            waitForPick()
            waitForDrop()

    client.loop_stop()