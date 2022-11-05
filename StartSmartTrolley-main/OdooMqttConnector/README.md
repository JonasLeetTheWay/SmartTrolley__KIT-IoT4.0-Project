# OdooConnect

facilitates connection from Odoo to Mqtt

replace server and port with your own configuration
```
server = "YOUR MQTT SERVER"
port = "YOUR MQTT PORT"
```

### Library
pip install paho-mqtt

### How to Use
- Run odoo_mqtt_connector.py
- Publish msg to MQTT topic "odoo/in" `which will be processed by MainCommunicator main.py`
- Subscribe msg to MQTT topic "odoo/out" `which already been processed by MainCommunicator main.py`

    - If publish fails, input any "integer" to republish msg to MQTT broker
    - Press "e" to quit

### Msg Format example

{
    'modelName': 'product.template',
    'methodName': 'search_read',
    'parametersArray': [],
    'parametersDict': {
        'fields': ['id','name'],
        'limit': 5
    }
}

### Demo
Run testmsg.py
