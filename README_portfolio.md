# Smart Trolley - IoT 4.0 Warehouse Automation System

A revolutionary warehouse picking solution that integrates IoT 4.0 components to accelerate product delivery times. Our system eliminates manual data entry and provides hands-free operation through AR glasses, making warehouse workers more efficient and reducing errors.

The Smart Trolley automatically tracks product weights, displays pick lists in AR glasses, and logs data directly to the ERP system - all while the worker focuses solely on loading products.

> Industry Partnership: Developed in collaboration with [ELABO company](https://www.elabo.com/) to solve real-world warehouse automation challenges

## Tech Stack
![ESP32](https://img.shields.io/badge/ESP32-000000?style=for-the-badge&logo=espressif&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-A22846?style=for-the-badge&logo=raspberry-pi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MQTT](https://img.shields.io/badge/MQTT-3C5280?style=for-the-badge&logo=eclipsemosquitto&logoColor=white)
![Odoo](https://img.shields.io/badge/Odoo-714B67?style=for-the-badge&logo=odoo&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![RealWear](https://img.shields.io/badge/RealWear-000000?style=for-the-badge&logo=android&logoColor=white)

### Key Technologies
- **Hardware**: ESP32, Raspberry Pi 4, RealWear HMT-1 AR Glasses
- **Sensors**: HX711 Load Cells, Strain Gauge Sensors (1kg, 5kg, 20kg)
- **Frontend**: React.js with Redux, WebRTC for AR glasses
- **Backend**: Python (MQTT Communication, Odoo Integration)
- **Database**: Odoo ERP System
- **Communication**: MQTT Protocol for IoT 4.0 messaging
- **3D Printing**: Custom sensor housings and trolley mounts

### Technical Implementation
The integration between hardware sensors and enterprise systems was achieved through:

1. **IoT 4.0 Architecture**
   - ESP32 sensors communicate via MQTT
   - Real-time weight monitoring and data transmission
   - Seamless integration with existing warehouse infrastructure

2. **AR Interface**
   - React-based web application for AR glasses
   - Real-time pick list display
   - Hands-free operation for warehouse workers

3. **ERP Integration**
   - Automated data logging to Odoo system
   - Eliminates manual data entry errors
   - Real-time inventory tracking

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Project Structure](#project-structure)
3. [Hardware Components](#hardware-components)
4. [User Interface](#user-interface)
5. [Performance Results](#performance-results)

## System Architecture

### System Overview
```mermaid
graph TB
    subgraph "Warehouse Floor"
        A[Worker with AR Glasses] --> B[Warehouse Slot with Load Cell]
        B --> C[ESP32 Sensor]
        C --> D[MQTT Broker]
        E[AR Glasses UI] --> A
        E --> D
    end
    
    subgraph "Control Center"
        D --> F[Raspberry Pi 4]
        F --> G[Main Communicator]
        F --> H[Odoo MQTT Connector]
        H --> I[Odoo DB]
    end
    
    subgraph "Data Flow"
        J[Pick List Display] --> E
        K[Weight Detection] --> C
        L[Inventory Update +/-1] --> I
    end
```

### Communication Flow
```mermaid
sequenceDiagram
    participant Worker
    participant ARGlasses
    participant LoadCell
    participant ESP32
    participant MQTT
    participant RaspberryPi4
    participant OdooDB

    Worker->>ARGlasses: View Pick List
    Worker->>LoadCell: Place/Remove Item
    LoadCell->>ESP32: Weight Change Detected
    ESP32->>MQTT: Publish Inventory Update (+1/-1)
    MQTT->>RaspberryPi4: Forward Sensor Data
    RaspberryPi4->>OdooDB: Update Inventory Count
    OdooDB->>RaspberryPi4: Confirm Update
    RaspberryPi4->>MQTT: Publish Status
    MQTT->>ARGlasses: Update UI Progress
    ARGlasses->>Worker: Show Updated Pick List
```

### Data Processing Pipeline
```mermaid
flowchart LR
    A[Load Cell] --> B[HX711 ADC]
    B --> C[ESP32 Processing]
    C --> D[MQTT Publish]
    D --> E[Raspberry Pi]
    E --> F[Data Validation]
    F --> G[Odoo Integration]
    G --> H[ERP Database]
```

## Project Structure

### Hardware Components
- **ESP32 Microcontroller**: Weight sensor data collection and MQTT communication
- **Load Cells**: HX711-based strain gauge sensors for precise weight measurement
- **Raspberry Pi 4**: Central communication hub and data processing
- **RealWear HMT-1**: AR glasses for hands-free pick list display
- **3D Printed Housings**: Custom sensor mounts and trolley integration

### Software Architecture
- **ESP32 Firmware**: Arduino-based sensor control and MQTT publishing
- **React AR Interface**: Web-based application for AR glasses display
- **Python Backend**: MQTT communication and Odoo ERP integration
- **MQTT Broker**: Central message routing for IoT 4.0 communication

## Hardware Components

### ESP32 Weight Sensing System
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fesp32.jpg?alt=media&token=5d0d802b-734a-4583-af8d-c736ad7f016c" width="300">
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fesp32-2.jpg?alt=media&token=fd0e7418-a630-4956-9eeb-b677d0709a14" width="300">

### Load Cell Integration
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Floadcell.jpg?alt=media&token=fccb5e6d-7b62-4296-aee7-fa72f4fe9be0" width="400">

### 3D Printed Sensor Housings
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview5.jpg?alt=media&token=c1d41686-4397-4bb3-bab4-244e1a5bc774" width="400">
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2Fview6.jpg?alt=media&token=d164458d-a550-4e72-8ea4-a9d4d1afef9d" width="400">

### Trolley Integration
<img src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/github%2FProject_Poster.jpg?alt=media&token=3bd0cacf-7590-4e0f-8cca-cbf4d85acb06" width="400">
<img width="400" src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/smarttrolley_portfolio%2Fsmarttrolley1.png?alt=media&token=ca432d23-aeb8-4b0d-abf4-d756b110b09c" />
<img width="400" src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/smarttrolley_portfolio%2Fsmarttrolley2.png?alt=media&token=20bcfd47-4bc0-4a03-b02b-38ca5a0292e1" />
<img width="400" src="https://firebasestorage.googleapis.com/v0/b/linemsgapi-v2.appspot.com/o/smarttrolley_portfolio%2Fsmarttrolley3.png?alt=media&token=e4d6cb13-a9a6-430d-92c2-6fa7966dde87" />

## User Interface

### AR Glasses Display
The AR interface provides warehouse workers with:
- Real-time pick list display
- Product location guidance
- Weight confirmation alerts
- Progress tracking

### System Monitoring
- Real-time weight measurements
- MQTT communication status
- ERP integration confirmation
- Error handling and alerts


