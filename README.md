# java-web-app

Experimenting with a Java Web Application built with the following components
- **Frontend**
    - **React Frontend** (Main Frontend App)
    - **Custom React Reusable Component Library**
    - **Micro Frontend** (to be loaded into main frontend)
- **Backend**
    - **Config Server as a Microservice** (with feature toggle)
    - **Microservices**
- **Infrastructure**
    - **Message Queues**
    - **Databases**

![Architecture](doc/images/architecture.png)

## Folder Structure

**Note: Do ignore folders with asterisk as they are just experimental projects!!**

```
root
├── ms-admin-service            # Micro-service (centralized admin services)
├── ms-notification-service     # Micro-service (websocket server)
├── react-component-library     # Custom React Reusable Component Library
├── react-frontend              # Main Frontend App
├── react-micro-frontend        # Sub Frontend that is consumes by main frontend app  
├── web-api-gateway-nginx       # API Gateway (Nginx)
├── web-api-gateway-node**      # API Gateway (Node)
└── ws-fake-api**               # Web Service (Node)
```

## Apps & API

- **Apps**
    - **6006** -- Storybook ([React Component Library](react-component-library/README.md))
    - **7001** -- Microservice ([Admin Service](ms-admin-service/README.md))
    - **7002** -- Microservice ([Notification Service - WebSocket](ms-notification-service/README.md))
        - [WebSocket Topics](ms-notification-service/doc/TOPICS.md)
    - **8080** -- [React Frontend](react-frontend/README.md)
    - **9090** -- [API Gateway](web-api-gateway-nginx/README.md)
- **API Endpoints**
    - **Admin Service**
        - [Announcements](ms-admin-service/doc/ANNOUNCEMENT_FEATURE.md)

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
    - Admin Service
        - `cd ms-admin-service`
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
- [React MicroFrontend Experiments](https://github.com/awarenessxz/react-micro-frontend)
