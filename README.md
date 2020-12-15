# java-web-app

This is a full stack java application built with multiple technology stack.

| Component | Descriptions |
| --- | --- |
| React Frontend | React Application coded in typescript and bundled using webpack. The app is designed using Elastic-UI, CSS Modules, SASS and Custom Component Library. End-to-End testing is done using Cypress. |
| Component Library | Custom React Reusable Component Library coded in typescript and bundled using rollup. The library is built using Material-UI, CSS Modules, SASS and etc... Functional testing is done using React Testing Library. |
| Micro Frontend | React Application coded in typescript and bundled using webpack. Making using of Module Federation in Webpack 5, it allows the main frontend app to consume components exposed from this application. |
| Config Server | Spring Cloud Config Server |
| Microservices | Bunch of Microservices coded using Spring Boot. Refer to documentation below for more details... |
| API Gateway | Api Gateway deployed on Nginx |
| Mongo DB | database for storing data |

## Architecture

### High Level Overview

![Architecture](doc/images/architecture.png)

### In Depth Design Concepts

1. [Frontend](react-frontend/doc/FRONTEND_DESIGN.md) 
2. [Microservice Backend](doc/MICROSERVICE_DESIGN.md)
3. [API Gateway](web-api-gateway-nginx/doc/API_GATEWAY_DESIGN.md)
4. [Client (Frontend) to Server Communication via websocket](ms-notification-service/doc/WEBSOCKET_DESIGN.md)
5. Message Queue
6. Logging
7. Authentication

## Folder Structure

**Note: Do ignore folders with asterisk as they are just experimental projects!!**

```
root
├── ms-notification-service     # Micro-service (websocket server)
├── ms-web-service              # Micro-service (backend web service)
├── react-component-library     # Custom React Reusable Component Library
├── react-frontend              # Main Frontend App
├── react-micro-frontend        # Sub Frontend that is consumes by main frontend app  
├── web-api-gateway-nginx       # API Gateway (Nginx)
├── web-api-gateway-node**      # API Gateway (Node)
└── ws-fake-api**               # Web Service (Node)
```

## Apps / Services / API

- **Apps / Services**
    - **6006** -- Storybook ([React Component Library](react-component-library/README.md))
    - **7001** -- Microservice ([Web Service](ms-web-service/README.md))
    - **7002** -- Microservice ([Notification Service - WebSocket](ms-notification-service/README.md))
        - [WebSocket Topics](ms-notification-service/doc/TOPICS.md)
    - **8080** -- [React Frontend](react-frontend/README.md)
    - **9090** -- [API Gateway](web-api-gateway-nginx/README.md)
- **API Endpoints**
    - **Web Service**
        - [Announcements](ms-web-service/doc/ANNOUNCEMENT_SERVICE.md)

## Quick Start

Before you can run this project, please follow the instructions on how to [set up your project environment](doc/PROJECT_SETUP.md).

### Backend

1. Start the databases
    - Mongo (Fresh)
        - `cd database`
        - `cd mongodata`
        - `rm -rf *`
        - `cd ..`
        - `sudo docker-compose up -d`

2. Start API Gateway
    - `cd web-api-gateway-nginx`
    - `sudo docker build -t apigateway_image .`
    - `sudo docker run --name apigateway --net=host -d apigateway_image`

3. Start Config Server

4. Start Microservices
    - Web Service
        - `cd ms-web-service`
        - `./gradlew bootRun`
    - Notification Service
        - `cd ms-notification-service`
        - `./gradlew bootRun`

### Frontend

1. Build React Component Library
    - `cd react-component-library`
    - `yarn install --ignore-scripts`
    - `yarn run build`

2. Start React Micro Frontend
    - `cd react-micro-frontend`
    - `yarn install`
    - `yarn start`

3. Start the Main Frontend App
    - `cd react-frontend`
    - `yarn install`
    - `yarn start`

## Contributions

If you are keen on making contributions. Please adhere to the following rules:
1. Create a branch / fork 
2. Create a pull request to merge your codes to master
3. **DO NOT** edit the master branch directly

## Documentations

### Relevant Materials

- [Writing Test using react-testing-library](react-component-library/doc/TESTING_USING_REACT_TESTING_LIBRARY.md)
- [Webpack Configuration](react-frontend/doc/WEBPACK.md)

### Misc / Just for Knowledge

- [IntelliJ set up](doc/PROJECT_SETUP.md)
- [Setting up Gradle for Multi Project](doc/GRADLE_TIPS.md)
- [Create custom reusable React component Library](react-component-library)
- [React Micro Frontend Experiments](https://github.com/awarenessxz/react-micro-frontend)
