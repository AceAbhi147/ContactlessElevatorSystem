# Elevator System Simulation Project

This project simulates an elevator system leveraging the features of Nx Systems to provide a more efficient and enhanced solution. The system includes user authentication, streaming data from cameras on each floor and in each elevator car, and gesture control using custom ML models available in the NX system to request elevators.

<br>
## Features

1. **User Authentication**: Ensures secure access to the elevator system.
2. **Camera Streaming**: Streams video data from cameras on each floor and within each elevator car.
3. **Gesture Control**: Uses custom machine learning models to enable gesture-based elevator requests.
4. **Analytics using Nx-Postprocessor**: Show data such as most visited floor etc for analytics purpose.

<br>
## Tech Stack

The project utilizes the following technologies to build and communicate with the elevator system:

1. **Node.js**: Backend development.
2. **P5.js**: Creating interactive elevator simulations.
3. **Chart.js**: Used for showing analytics data.
4. **Socket.IO**: Communication and event triggering for elevator simulation.
5. **Nx Tools**: Interaction with Nx media server and client.
6. **Tensorflow & Mediapipe**: Hand gestures recognition model.



<br><br><br>
# Getting started:

<br>
## Streaming a sample video
The files required for this are present in **resources** folder. Just cd into that and run the 2nd and 3rd commands

    1. Create a configuration file for the RTSP server called rtsp-simple-server.yml:
    protocols: [tcp]
    paths:
      all:
        source: publisher

    2. Start the RTSP server as a Docker container:
    $ sudo docker run -d --rm -it -v $PWD/rtsp-simple-server.yml:/rtsp-simple-server.yml -p 8554:8554 aler9/rtsp-simple-server:v1.3.0

    3. Use ffmpeg to stream a video file (looping forever) to the server:
    ffmpeg -re -stream_loop -1 -i file_name_with_path -c copy -f rtsp rtsp://localhost:8554/debug

<br>
## Setup Nx Client and Mediaserver
Follow this link: [Setting up Nx system](https://nx.docs.scailable.net/miscellaneous/hackathon-nx-evos-building-enterprise-scale-video-applications)

<br>
## Instructions to run
1. Make sure Nx mediaserver and client are installed with NX AI Plugin enabled
2. Ensure rules created on stream to hit /events/request API with source and destination floor. See the curl below.
3. Apply relevant model to your stream
4. Run the contactless-elevation Node.js application using npm start or run it using docker.
5. Navigate to localhost:5000/login and start from there.


<br><br><br>
# System Details

<br>
## Gestures Model Details (NX AI Model ID: d05cc436-d74d-455f-b9ed-587fc4543a60)
Used tensorflow & Google's mediapipe to create a hand gesture recongnition model. A demo for which is attached below.
https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/03f5940d-fc25-48dd-ba07-79bc3c6af08e

Converted the Tensorflow model to ONNX model, which is added in **resources** folder. Wasn't able to add to NX AI Cloud as 
at first glance it looked like, only RGB based models are supported. 

Since NX didn't support this, I have integrated my own solution for **Contactless Elevator** and hope in future, the model can
be added to NX AI Cloud.

<br>
## Nx-Postprocessor
This system uses Nx postprocessor that creates a csv file that will be used for analytical purposes like 
checking the most frequently visited floor or the source floor from where the passenger boards.
Mediaserver, via postprocessor, saves the csv file in the **public** folder so as to show them in analytics page.
The path to save the .csv is explicitly specified. So, make sure the change it and follow the process to apply postprocessor. Link provided below.
The compiled file is present in **resources** folder and the source file itself is present in **nx-postprocessor** folder

[Configure postprocessor](https://github.com/scailable/sclbl-integration-sdk#)

<br>
## Deployment
The project is available as a Docker image on Docker Hub:

[Docker Image](https://hub.docker.com/r/aceabhi147/contactless-elevator) ⚠️Waring⚠️ --> Not updated

You can also access the deployed project on Render:

[Contactless Elevator System](https://contactless-elevator.onrender.com/login) ⚠️Waring⚠️ --> Not updated

<br>
## How It Works

- **Node.js**: Uses Express.js to provide API routes.
- **P5.js**: Handles the elevator simulation.
- **Socket.IO**: Triggers elevator actions based on REST requests.
- **Nx System**: Events triggers the elevators based on model detection


<br><br><br>
# UI & Demo

## UI pages
Login Page
![Image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/fae2c2f0-6d6d-45b5-9ce1-feb5dba416a5)

Authentication using Nx
![Image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/b32d9a53-ceb1-4887-a1c4-89a659b0b857)

System details
![Image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/5702f0e5-9b11-4e4c-ad81-86f680e2ec14)

Video Streaming from Nx client using API
![Image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/0f467336-5987-491f-a5cf-93cc74206cf6)

Contactless elevator system
![Image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/17676c73-5f4d-4b69-9b4d-f168e582ba1c)


## Curl for request to the Elevator with source and destination floor numbers
```
curl --location 'https://contactless-elevator.onrender.com/events/request' \
--header 'Content-Type: application/json' \
--data '{
    "start": 1,
    "end": 7
}'
```

On local:
```
curl --location 'http://localhost:5000/events/request' --header 'Content-Type: application/json' --data '{
    "start": 1,
    "end": 7
}'
```

## Demo with NX AI Integration
[Demo with Nx AI Integration](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/49f56f9d-b5d4-4839-9256-fa13e9adc586)

## Demo using curl commands
[Demo using curl](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/dfb56f83-6a35-4013-826a-96d331bdef23)



<br><br><br>
# Known Issues

1. **Authentication APIs**: The authentication APIs are not functioning correctly, resulting in the "Inputs Video" tab being non-functional.
2. **Media Server Dockerization**: The project aimed to dockerize the media server and integrate it into the contactless elevator system. 
                                   However, the provided beta version couldn't be dockerized, and the NX plugin requires version >= 6.0. 
                                   A new private version (6.0.0.38678) was provided, but cloud login issues persisted.
3. **Nx AI Cloud**: Although the model was ready and converted on ONNX format (which is attached in the **resource** folder as well), Nx supports only those model that utilises RGB. 
                    Since our model is based on coordinates, it wasn't supported by Nx AI Cloud. Hence decided to use our code for custom integration to elevator system
4. **Post-Processor**: Explicitly adding path to generate and save csv data which is being used to show analytics.
5. **Docker Images & Deployment**: Application deployed on render isn't complete as it couldn't communication with dockerise Nx mediaserver. 
                                   Also, for consequtive deployments payment gateway had to be added so skipped it.

Will try to add additional changes to it!!
We appreciate any contributions and feedback to improve this project. Thank you for checking out the Elevator System Simulation Project!
