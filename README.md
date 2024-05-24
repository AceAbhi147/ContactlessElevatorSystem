# Elevator System Simulation Project

This project simulates an elevator system leveraging the features of Nx Systems to provide a more efficient and enhanced solution. The system includes user authentication, streaming data from cameras on each floor and in each elevator car, and gesture control using custom ML models available in the NX system to request elevators.


## Features

1. **User Authentication**: Ensures secure access to the elevator system.
2. **Camera Streaming**: Streams video data from cameras on each floor and within each elevator car.
3. **Gesture Control**: Uses custom machine learning models to enable gesture-based elevator requests.


## Tech Stack

The project utilizes the following technologies to build and communicate with the elevator system:

1. **Node.js**: Backend development.
2. **P5.js**: Creating interactive elevator simulations.
3. **Socket.IO**: Communication and event triggering for elevator simulation.
4. **Nx Tools**: Interaction with Nx media server and client.



## Streaming a sample video

    1. Create a configuration file for the RTSP server called rtsp-simple-server.yml:
    protocols: [tcp]
    paths:
      all:
        source: publisher

    2. Start the RTSP server as a Docker container:
    $ sudo docker run -d --rm -it -v $PWD/rtsp-simple-server.yml:/rtsp-simple-server.yml -p 8554:8554 aler9/rtsp-simple-server:v1.3.0

    3. Use ffmpeg to stream a video file (looping forever) to the server:
    ffmpeg -re -stream_loop -1 -i file_name_with_path -c copy -f rtsp rtsp://localhost:8554/debug

## Gestures (NX AI Model ID: d05cc436-d74d-455f-b9ed-587fc4543a60)
https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/03f5940d-fc25-48dd-ba07-79bc3c6af08e



## Deployment

The project is available as a Docker image on Docker Hub:

[Docker Image](https://hub.docker.com/r/aceabhi147/contactless-elevator)

You can also access the deployed project on Render:

[Contactless Elevator System](https://contactless-elevator.onrender.com/login)


## How It Works

- **Node.js**: Uses Express.js to provide API routes.
- **P5.js**: Handles the elevator simulation.
- **Socket.IO**: Triggers elevator actions based on REST requests.

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


## Known Issues

1. **Authentication APIs**: The authentication APIs are not functioning correctly, resulting in the "Inputs Video" tab being non-functional.
2. **NX AI Plugin Integration**: The intended use of NX AI Plugins for triggering elevator requests is not operational due to issues with the plugin installation in subsequent versions.
3. **Media Server Dockerization**: The project aimed to dockerize the media server and integrate it into the contactless elevator system. However, the provided beta version couldn't be dockerized, and the NX plugin requires version >= 6.0. A new private version (6.0.0.38678) was provided, but cloud login issues persisted.

We appreciate any contributions and feedback to improve this project. Thank you for checking out the Elevator System Simulation Project!
