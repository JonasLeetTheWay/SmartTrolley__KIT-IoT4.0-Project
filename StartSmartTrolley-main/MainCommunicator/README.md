# MainCommunicator

replace server and port with your own configuration
```
server = "YOUR MQTT SERVER"
port = "YOUR MQTT PORT"
```

### critical code snippet in main.py
```
import libraries (paho.mqtt.client, json, threading, time...)

def main(): 

    # initialize Mqtt environment and data
    mqttServer = "YOUR SERVER"
    config_params = {"YOUR CONFIGURATION PARAMETERS"}
    mqtt_data = {"YOUR DATA TO BE PUBLISHED TO MQTT"}

    # running Mqtt broker service
    client = mqtt.Client()
    client.on_message = updateData(oldData, message)
    client.connect(server, port, 60)
    client.loop_start()
    
    """
    our program service - 
    1. await warehouse picker to verify which warehouse trolley he's dealing with
    2. then Smart Glasses will inform him through Smart Glasses UI, which products have to be loaded
    3. constantly looping function waitForPick() and waitForDrop(), automating data logging of picked product into Odoo ERP Database
    """
    while scanTrolleyQR():    
        while showMissingParts():
            waitForPick()
            waitForDrop()

    client.loop_stop()
```