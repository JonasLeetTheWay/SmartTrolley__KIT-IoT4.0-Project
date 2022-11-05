
/*
   -------------------------------------------------------------------------------------
   HX711_ADC
   Arduino library for HX711 24-Bit Analog-to-Digital Converter for Weight Scales
   Olav Kallhovd sept2017
   -------------------------------------------------------------------------------------
*/

/*
   Settling time (number of samples) and data filtering can be adjusted in the config.h file
   For calibration and storing the calibration value in eeprom, see example file "Calibration.ino"
   The update() function checks for new data and starts the next conversion. In order to acheive maximum effective
   sample rate, update() should be called at least as often as the HX711 sample rate; >10Hz@10SPS, >80Hz@80SPS.
   If you have other time consuming code running (i.e. a graphical LCD), consider calling update() from an interrupt routine,
   see example file "Read_1x_load_cell_interrupt_driven.ino".
   This is an example sketch on how to use this library
*/

#include <HX711_ADC.h>
#include <PubSubClient.h>
#include <WiFi.h>
#if defined(ESP32)
#include <EEPROM.h>
#endif
using namespace std;

//pins:
const int HX711_dout = 19; //mcu > HX711 dout pin
const int HX711_sck = 18;  //mcu > HX711 sck pin

//HX711 constructor:
HX711_ADC LoadCell(HX711_dout, HX711_sck);

const int calVal_eepromAdress = 0;
unsigned long t = 0;

// Constants for WiFi and MQTT Server connection
const char *ssid = "KIT-IoT";
const char *password = "68Yh*N#oJJoYCTeXQYj]1<+W"; // "xak@;?>(7wlz;<ctR2ZDqe}^";
const char *broker = "imi-i40-mqtt.imi.kit.edu";
const char *outTopic = "rpi/esp/out";
WiFiClient espClient;
PubSubClient client(espClient);

const int errorConst = 10;
const float calibrationConst = 101.40;
float lastValue = 0;

// function to (re)connect to mqtt server
void reconnectMqtt()
{
  while (!client.connected())
  {
    Serial.print("\nConnecting to ");
    Serial.println(broker);
    if (client.connect("randomID-jgkuzduzi"))
    {
      Serial.print("\nConnected to ");
      Serial.println(broker);
    }
    else
    {
      Serial.println("\nTrying to connect again");
      delay(5000);
    }
  }
}

// function to (re)connect to WiFi
void reconnectWiFi()
{
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("\nConnecting to ");
    Serial.println(ssid);
    delay(500);
  }
  Serial.print("\nConnected to ");
  Serial.println(ssid);
}

// sends mgtt message with lastr saved scale values
void sendMessage(String i)
{
  String msg = "{\"weight\":";
  msg += " " + i + "}";
  const char *str = msg.c_str();
  client.publish(outTopic, str);
}

// Setup function which will run once in beginning
void setup()
{
  Serial.begin(921600);
  delay(10);
  Serial.println();
  Serial.println("Starting...");

  LoadCell.begin();
  //LoadCell.setReverseOutput(); //uncomment to turn a negative output value to positive
// uncomment this if you want to set the calibration value in the sketch
#if defined(ESP32)
  //EEPROM.begin(512); // uncomment this if you use ESP8266/ESP32 and want to fetch the calibration value from eeprom
#endif
  //EEPROM.get(calVal_eepromAdress, calibrationValue); // uncomment this if you want to fetch the calibration value from eeprom

  unsigned long stabilizingtime = 6000; // preciscion right after power-up can be improved by adding a few seconds of stabilizing time
  boolean _tare = false;                //set this to false if you don't want tare to be performed in the next step
  LoadCell.start(stabilizingtime, _tare);
  if (LoadCell.getTareTimeoutFlag())
  {
    Serial.println("Timeout, check MCU>HX711 wiring and pin designations");
    while (1)
      ;
  }
  else
  {
    LoadCell.setCalFactor(calibrationConst); // set calibration value (float)
    Serial.println("Startup is complete");
    delay(5000);            //pause of 5 secs in case the ESP32 is not connected to a "T" keyboard
    LoadCell.tareNoDelay(); // the tare is automatic activated
  }

  client.setServer(broker, 1883); // set server Port (Mqtt)
}

void loop()
{
  static boolean newDataReady = 0;
  const int serialPrintInterval = 1000; //increase value to slow down serial print activity

  // check WiFi status test
  if (WiFi.status() != WL_CONNECTED)
  {
    reconnectWiFi();
  }

  // check mqtt server status
  if (!client.connected())
  {
    reconnectMqtt();
  }
  client.loop();

  // check for new data/start next conversion:
  if (LoadCell.update())
    newDataReady = true;

  // get smoothed value from the dataset:
  if (newDataReady)
  {
    if (millis() > t + serialPrintInterval)
    {
      float i = LoadCell.getData();
      Serial.print("Load_cell output val: ");
      Serial.println(i);
      if (i < lastValue - errorConst || i > lastValue + errorConst)
      {
        sendMessage(String(i));
        lastValue = i;
      }

      newDataReady = 0;
      t = millis();
    }
  }

  // receive command from serial terminal, send 't' to initiate tare operation:
  if (Serial.available() > 0)
  {
    char inByte = Serial.read();
    if (inByte == 't')
      LoadCell.tareNoDelay();
  }

  // check if last tare operation is complete:
  if (LoadCell.getTareStatus() == true)
  {
    Serial.println("Tare complete");
  }
}