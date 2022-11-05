# Smart Trolley - Warehouse Picker Data Logging Helper with AR Glasses

Today's market is characterized by ever faster development and market launch times - who completes task faster wins. By integrating IoT 4.0 components in a medium-sized company, our solution speeds up product delivery time. This way, we help company remains competitive, by fully capitalizing IoT 4.0 automation to speed up even eliminates certain company workflow. 

We work with [ELABO company](https://www.elabo.com/), our goal is to `speed up product delivery time`, so that warehouse picker (worker) can load products need to be delivered to customers quicker.
- provide AR Glasses UI for worker to quickly glance the products he need to load 
- automate the data logging to ERP database (so worker don't have to manually type in the data to ERP database in PC)
- utilize state-of-the-art [industrial IoT 4.0 communication protocol MQTT](https://mqtt.org/)

> Our scenario is based on a lot of preparatory work by students from previous semesters, which needs to be expanded. They have already dealt extensively with the assembly tables provided by Elabo and their integration into the I4.0 world.

## Our Solution
Traditionally, warehouse picker holds a picklist in hand, ready to load the products into warehouse trolley. He has to pick product and manually record added product quantity to the paper, then register into ERP database.

With our solution, warehouse picker don't need to hold picklist in hand anymore, instead he can look at picklist shown inside AR Glasses he wear, and start loading products right away. He also don't need to remember the quantity of loaded products, and logged the data to ERP database by hand. He can solely focus on loading product, because our program automates this database logging. This is possible because we capitalizes on the power of IoT 4.0 technology, with following devices and platform:
1. Raspberry Pi 4
2. ESP32
3. AR Glasses
4. open-source [ERP system Odoo](https://www.odoo.com/)
## Use-case scenario

![Showcase GIF](https://user-images.githubusercontent.com/75115433/200133023-c3c923bc-36bb-4c16-ad84-4edad348aef3.gif)

https://youtu.be/AnJoZm1XY_Q
## Project Poster
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2FProject_Poster.jpg?alt=media&token=e4243d53-64e3-466d-be70-52d5d13d5f4b" width="450" />

<details><summary> Hardware </summary> <p>

## Hardware List

| Part | Present | To buy | ? | Comment |
|------|-----------|-----------|---|-----------|
| ESP32 | | 1 | | |
| Strain gauge sensors | | 3 | | Three different types of strain gauge sensors to test |
| Force sensor | | 1 | | |
| Soldering Accessories | | | 1 | For soldering the sensors |
| AR Glasses | 3 | | | |
| Loudspeaker | | | 1 | |
| Cables | | | 1 | For soldering and for connecting the components |
| Raspberry Pi | 1 | | |  |
| Battery for ESP32 | | 1 | | |

## ESP32 

The ESP32 is an affordable, low-power board with Wi-Fi and dual-mode Bluetooth that enables communication between the weight sensors (which receive and convert the incoming signal from the amplifier) ​​and the Raspberry Pi. The small size, ease of use, the versatility and the large number of GP I/O pins made this board the right choice for the project.

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fesp32.jpg?alt=media&token=5d0d802b-734a-4583-af8d-c736ad7f016c" width="260" /> <img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fesp32-2.jpg?alt=media&token=fd0e7418-a630-4956-9eeb-b677d0709a14" width="250" />

### Analogue Digital Converter => Kali and Mess Library
The Kali and Mess codes were written in C++ using the HX711-ADC library. This code enables the sensors to be calibrated through a tare process like a normal scale (a calibration constant is automatically calculated at the beginning of the program and can then be manually changed thereafter), and the regular measurement of the weight values ​​thereafter. For more information about the HX711-ADC library please see: https://github.com/olkal/HX711_ADC

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fesp32_pins.png?alt=media&token=1e3b6ce6-72a9-47c0-9970-7190bf96a212" width="500" />

https://randomnerdtutorials.com/getting-started-with-esp32/

### Used Pins
The connection between the ESP32 and the amplifier is made as follows: the GND bases are connected via the blue wire; the VCC pin is connected to the ESP32's Vin pin via the red wire; the data pin (DT) is connected to pin 19 via the green wire; the clock pin (SCK) is connected to pin 18 via the yellow wire. The connection between the amplifier and the strain gauge sensor is described in the "SG Sensors" section.

## DMS Strain Gauge Sensors
### How does the strain gauge sensor work?

The strain gauge sensors calculate the weight on them based on the deformation (stress) caused. The sensor consists of a series of resistors (4 resistors forming the so-called Wheatstone bridge) whose resistance value changes depending on the deformation. The weight of the object placed on the sensor can be calculated from the fluctuations in this value and the corresponding voltage in the circuit.

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fwheatstone_bridge.png?alt=media&token=9ab676b0-09e7-420d-9f09-171b0ccfadc3" width="250" />

Connection to the sensor is via 2 input wires that power the circuit and 2 output wires. The sensor is connected to the ESP32 via an amplifier which not only amplifies the signal read from the sensor to ESP32 compatible voltage levels (typically in the 0-5V range) but also allows the data read to be synchronized via a clock signal.

### Montage used

The sensor is connected to the amplifier as follows: the black and red wires (corresponding to the input current signal) are connected to pins E- and E+ respectively; the green and gray wires are connected to pins A+ and A-, respectively.

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2FDMS_Sensor_to_ESP32_linkage.png?alt=media&token=97b901af-18a2-4215-8847-72b7439fa17a" width="600" />

### Applications
Depending on the application (e.g. weight of the parts used and desired measurement accuracy), 1kg, 5kg or 20kg sensors can be used. Of course, the smaller their nominal value, the higher the absolute accuracy of the sensors, and the relative accuracy stated in the documentation of the sensors is 0.5% of the nominal value. However, this value is actually much higher due to the accumulation of various measurement and signal transmission errors (particularly due to instability in assembly, imperfections in electrical connections, etc.).

The main instability factors were mitigated by an appropriate design of the sensor support structure and housings, which was subsequently improved as described in the "3D Printed Parts" section. The welding (soldering) of the various connections has also been revised and improved, as have the cable connections and their insulation.


## Load Cell
Load cells are a form of force sensor typically used to measure weight.

When a weight is placed on the load cell, the geometry of the load cell changes slightly due to the bending stress experienced by the cell. The change in geometry is then determined by a DMS sensor or a force transducer. DMS sensors are strain gauges, these were described in a previous chapter. In connection with the load cell, force transducers are usually spring bodies made of metal. These convert a geometric deformation into an electrical signal. This electrical signal is then translated into a weight.
For our project we tested several load cells. We chose a load cell with a maximum load capacity of 5 kg because it has the smallest error tolerance and the maximum load capacity is sufficient for our application.

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Floadcell.jpg?alt=media&token=d2fec54b-d42c-4418-9c98-75a8a7b24305" width="400" />


## 3D Printing Parts

The goals for the parts: 
- prioritize safety
- minimize 3D parts material (plastic)
- flexible structure to allow easy modification

To achieve this:
- designed housing that could be mounted on the trolley
- manufactured product modularly (in programmer terms, OOP), separated one big product into different smaller parts, so that any modification will have effect only on smaller parts instead of affecting the whole product
- enhanced its durability, by designing a bumper for the weighing cell, to uniformly distribute the pressure caused by the weight of the boxes


### To-be-assembled product
1st edition

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview1.jpg?alt=media&token=39dee274-6a28-4fd0-9583-7e8395eb0613" width="400" />

2nd edition

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview2.jpg?alt=media&token=ad5392df-c5d9-477f-982c-ac6cbdd0bd36" width="400" />

3rd edition

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview3.jpg?alt=media&token=dcd482cf-cccb-449a-83ba-a8bdaef4ee0c" width="400" />

trolley-mounter

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview4.jpg?alt=media&token=ad4263ec-b3f8-41cd-957c-a33037cc340b" width="400" />

### Fully-assembled product

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview5.jpg?alt=media&token=eda61c04-3691-41ee-84a4-15b3e008f078" width="500" />

<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview6.jpg?alt=media&token=0b0f082f-7a3f-4ec5-ba64-ce7c113e4344" width="500" />

</p></details>



<details><summary> Software </summary><p>

## Odoo Mqtt Connector

### General Info
The Odoo Mqtt Connector consists of 3 modules:

1. The connection to the MQTT server running at imi-i40-mqtt.imi.kit.edu in the i40lab VLAN
2. The connection to the Odoo server running at http://imi-odoo-2004.imi.kit.edu:8069 in the i40lab VLAN
3. The main module in which the connections are started and monitored.

Modules 1 and 2 are implemented in the mqttInterface.py and odooInterface.py respectively, but the real communication happens at Module 3.

Module 3 is implemented in odoo_mqtt_connector.py. 
- messages that being published to MQTT broker labeled with topic 'odoo/in' are processed here by Raspberry Pi
- then sent to Odoo in an Odoo-readable format
- Odoo's response is then sent back to MQTT broker labeled with topic 'rpi/odoo/out'

### Run
`python3 ./odoo_mqtt_connector.py`



## Main Communicator
### General Info

Main Communicator consists of just one module implemented in `main.py`.

First, a connection to MQTT broker is established. When messages are received, they are sorted by sender sent times. Then Dict.update() is used to save the latest messages from ESP, Odoo or AR Glasses.

Then the main routine is started. This always checks whether new messages have arrived. If so, the workflow is progressed further, otherwise it waits.

> The dataXChanged variables are single-element lists so they can be passed by reference to `updateData(oldData, newData, changed)`. The content can be changed globally with changed\[0\] = X.

### Run
`python3 ./main.py`

</p></details>











 

<details><summary> Test Results </summary><p>

## Load Cell
### Validation
The deviation of the consecutive readings from each other when the contents of the box are immobile is 2.5 gr, which translates to an error of 0.05%, since the tests were carried out with the 5 kg sensor. This absolute value is relatively constant and independent of the load on it.

The results obtained and their accuracy are highly dependent on the conditions under which the tests were conducted.

In stable conditions and with good support of the body on the sensor, the results turned out to be quite good: an almost constant relative error of 5% of the real value was obtained (variation between 3.3% and 5.6%):

|**Real Weight** |**Read Weight**|**Relative Error**|
|:-----------------: |:--------------------: |:-----------------: |
| 153 g | 159 g | 3.9% |
| 301 g | 311 g | 3.3% |
| 238 g | 246 g | 3.4% |
| 539 g | 567 g | 5.2% |
| 1613 grams | 1690 g | 4.8% |
| 1990 grams | 2101 grams | 5.6% |

If the load is placed on the higher part of the box (farther from the sensor), there will also be a variation in the reading, which is usually lower than the value measured when the weight is on the lower part of the box box (closer to the sensor), even measuring values ​​lower than the real value. The errors measured with this arrangement are around -4% (the negative sign only means an underestimation in relation to the real value).

The biggest mistake, however, turned out to be the instability of the box or the incorrect positioning of the box on the rail. The lateral clearances and the instability of the bottom of the box (due to its direct placement on the chute rollers) cause fluctuations of up to 70 gr, regardless of the load on the boxes.

It is therefore recommended to improve this last point first and to work on it in the future.

### Verification
To verify the purpose (counting the number of items in a box by weight measurements), a first code test was written that calculated an average of 5 and/or 10 measured values ​​after a deviation of more than 40 grams from the one measured in the previous moment value had occurred. Also, after registering this variation, there is a 2-second pause before the average is calculated to allow the values ​​to stabilize.

This attempt proved successful for small loads up to 600 grams, meaning that each piece has a real weight of around 100 grams.
However, in order to successfully use the full range allowed by the sensor (in this case 5 kg), the problems described above must be mitigated in order to reduce the measurement error.

### Battery Life
The battery life test has shown that the battery can operate the ESP32 for about 20 hours at a time.

</p></details>


<details><summary> Ideas for Next Generation </summary><p>

- Combination with RFID antennas or GPS sensor to find trolley in warehouse​
- Visual or audible alerts regarding the inventory status of the trolley​
- Integrate more than one trolley compartment
- Extension of QR code trolley recognition ​
- Add storage compartment (in table for rough orientation)
- Implement ESP program with "Sleep" function so that the battery lasts longer when the trolley is not used.
- Replace the power bank with a lithium cell 18650 to keep the cost of the project low.

 <img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fsignal_lighter.png?alt=media&token=ac19fec9-ef74-4955-ab47-552d74801ec8" width="200" />
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Flithium_battery_18650.png?alt=media&token=1866cb0f-37f6-4fac-9970-47489a1c3806" width="200" />

</p></details>
