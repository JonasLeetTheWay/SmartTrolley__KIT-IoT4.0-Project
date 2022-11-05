/// <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>;

console.log("connecting mqtt...");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://imi-i40-mqtt.imi.kit.edu:8080");

client.on("connect", function () {
  console.log("Connected");
  client.subscribe("odoo/out", function (err) {
    if (!err) {
      client.publish("odoo/out", "Hello mqtt");
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
