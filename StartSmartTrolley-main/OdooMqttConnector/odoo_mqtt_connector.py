from mqttInterface import MqttInterface
from odooInterface import *
import json

do_exit = [False]
# this is the only interesting Method in this project


def on_message(client, userdata, message):                           # the whole functionality
    # take the message to Odoo from Mqtt
    msg = json.loads(str(message.payload.decode("utf-8", "ignore")))
    result = odooConnection.sendMessage(
        msg["modelName"],            # and send it to Odoo
        msg["methodName"],
        msg["parametersArray"],
        msg["parametersDict"]
    )
    print("got Answear \n")  # + str(result))
    if result[0] != "Error":
        # send back Odoos Answear to Mqtt
        mqttConnection.send_message(json.dumps(result))


odooInfo = {
    "url": "YOUR ODOO ACCOUNT API",
    "database": "YOUR ODOO DATABASE LOCATION",
    "user": "YOUR ODOO USERNAME",
    "password": "YOUR ODOO PASSWORD",
}

mqttInfo = {
    "server": "YOUR MQTT SERVER",
    "port": "YOUR MQTT PORT",
    "keepalive": 60,
    "topicToOdoo": "odoo/in",
    "topicOdoosAnswear": "rpi/odoo/out",
}

# Setup connections

odooConnection = OdooInterface(**odooInfo)
mqttConnection = MqttInterface(**mqttInfo)

mqttConnection.client.on_message = on_message
mqttConnection.client.loop_forever()
