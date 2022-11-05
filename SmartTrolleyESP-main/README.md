# ESP32

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