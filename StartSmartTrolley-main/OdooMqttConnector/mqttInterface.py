import paho.mqtt.client as mqtt

class MqttInterface:

    client = mqtt.Client()
    server = "YOUR MQTT SERVER"
    port = "YOUR MQTT PORT"
    keepalive = 60
    topicToOdoo = "odoo/in"
    topicOdoosAnswear = "odoo/out"
    user = "YOUR MQTT USER"
    password = "YOUR MQTT PASSWORD"
    
    def __init__(self, **kwargs):        
        self.server, self.port, self.keepalive, self.topicToOdoo, self.topicOdoosAnswear, self.user, self.password = \
            kwargs.get('server', self.server), \
            kwargs.get('port', self.port), \
            kwargs.get('keepalive', self.keepalive), \
            kwargs.get('topicToOdoo', self.topicToOdoo), \
            kwargs.get('topicOdoosAnswear', self.topicOdoosAnswear), \
            kwargs.get('user', self.user), \
            kwargs.get('password', self.password) 
        self.connect()

    def on_connect(self, client, userdata, flags, rc):
        print("Connected with result code " + str(rc) + "\n")
        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.
        client.subscribe(self.topicToOdoo)

    def send_message(self, msg):
        self.client.publish(self.topicOdoosAnswear, msg)

    def connect(self):        
        self.client.on_connect = self.on_connect
        #self.client.username_pw_set(self.user, self.password)
        self.client.connect(self.server, self.port, self.keepalive)
        
    def disconnect(self):
        self.client.disconnect()
