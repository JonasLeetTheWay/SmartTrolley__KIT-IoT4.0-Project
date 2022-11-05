# AR Glasses

- model: [RealWear HMT-1](https://realwear.at/hmt-1/?keyword=realwear%20hmt%201&device=c&network=g&campaignid=12461183932&gclid=CjwKCAiAo4OQBhBBEiwA5KWu_8ekYhez1Gfo6hnIeIROSiillUNRqOw1z7C_q8JrjQA0BPXqxf3FChoCipoQAvD_BwE)
- utilize [Kimoknow Object Detection API](https://www.kimoknow.de/) (developed at [Karlsruhe Institute of Technology](https://www.kit.edu/english/index.php))

A JavaScript Webapp, which has etablished P2P connection to the object detection server, extracts videostream out of any browser (mobile, PC). The videostream is sent to the ML-trained classifier server, after classification being done, detection results will be sent back to user.

### Requirements
Node.js and npm have to be installed
- https://nodejs.org/en/download/
- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 

### Repo Init
Open the repository from command line
```npm i```
All the defined packages should be installed

### How to Use
Open the repository from command line\
Start the Webserver using:
```npm start```

## Kimoknow Object Detection Basic API calls:

*classification/detection models*

| type |	data |
|------|---------|
|"select_classification_model"|	"modelName"|
|"delete_classification_model"|	"modelName"|
|"select_detection_model"|	"modelName"|
|"delete_detection_model"|	"modelName"|

*labelListClassification*

| type |	data |
|------|---------|
|"labelList"|	{"model":current_classificationModel,"labels":labellistClassification}|


*labelListDetection*

| type |	data |
|------|---------|
|"labelListDetection"|	[labellistDetection...]|

*labelData classification/detection*

| type |	data |
|------|---------|
|"labeldata"|	{"type":"classification","label":<labelName>,"conf":<value as float between 0 and 1 e.g. 0.1>}|
|"labeldata"|	{see detectionData}|

*detectionData*

| type |	data |
|------|---------|
|"detection"|	[{"label":<labelName>,"conf":<value as float between 0 and 1 e.g. 0.1>,"bb":{"xmin":0.1,"ymin":0.1,"xmax":0.1,"ymax":0.1}},...]|

## Note
_The website now runs on localhost but can be accessed from the network via the ip adress of the host computer_

**! Kimoknow Peer Connect Server is not available for anyone, it only offers service for authorized students or institutions.**
> To get the detection results from Kimoknow Object Detection Server, Kimoknow Server have to authorize you
