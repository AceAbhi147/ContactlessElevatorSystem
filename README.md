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


## Deployment

The project is available as a Docker image on Docker Hub:

[Docker Image](https://hub.docker.com/r/aceabhi147/contactless-elevator)

You can also access the deployed project on Render:

[Contactless Elevator System](https://contactless-elevator.onrender.com/login)


## How It Works

- **Node.js**: Uses Express.js to provide API routes.
- **P5.js**: Handles the elevator simulation.
- **Socket.IO**: Triggers elevator actions based on REST requests.

## UI page
![image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/fae2c2f0-6d6d-45b5-9ce1-feb5dba416a5)
![image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/b32d9a53-ceb1-4887-a1c4-89a659b0b857)
![image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/5702f0e5-9b11-4e4c-ad81-86f680e2ec14)
![image](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/17676c73-5f4d-4b69-9b4d-f168e582ba1c)

## Curl for request to the Elevator with source and destination floor numbers
curl --location 'https://contactless-elevator.onrender.com/events/request' \
--header 'Content-Type: application/json' \
--data '{
    "start": 1,
    "end": 7
}'

## Demo
[Demo](https://github.com/AceAbhi147/ContactlessElevatorSystem/assets/22478260/dfb56f83-6a35-4013-826a-96d331bdef23)


## Known Issues

1. **Authentication APIs**: The authentication APIs are not functioning correctly, resulting in the "Inputs Video" tab being non-functional.
2. **NX AI Plugin Integration**: The intended use of NX AI Plugins for triggering elevator requests is not operational due to issues with the plugin installation in subsequent versions.
3. **Media Server Dockerization**: The project aimed to dockerize the media server and integrate it into the contactless elevator system. However, the provided beta version couldn't be dockerized, and the NX plugin requires version >= 6.0. A new private version (6.0.0.38678) was provided, but cloud login issues persisted.

We appreciate any contributions and feedback to improve this project. Thank you for checking out the Elevator System Simulation Project!
