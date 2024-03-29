# java-web-app

This is a full stack java application built with multiple technology stack. 

| Category | Component | Descriptions |
| --- | --- | --- |
| Frontend | React Frontend | React Application coded in **typescript** and bundled using **webpack**. The app is designed using Elastic-UI, CSS Modules, SASS and Custom Component Library. End-to-End testing is done using **Cypress**. |
| Frontend | Component Library | Custom React Reusable Component Library coded in **typescript** and bundled using **rollup**. The library is built using Material-UI, CSS Modules, SASS and etc... Functional testing is done using **React Testing Library**. Components can be viewed on **storybook** |
| Frontend | Micro Frontend | React Application coded in **typescript** and bundled using **webpack**. Making using of Module Federation in Webpack 5, it allows the main frontend app to consume components exposed from this application. |
| Backend | Microservices / APIs | Bunch of Microservices coded using **Spring Boot** and **Kotlin**. Refer to documentation below for more details... |
| Backend (Gateway) | API Gateway | **Spring Cloud Gateway** as the first line of defence when handling requests from external |
| Backend (Infra) | Config Server | **Spring Cloud Config Server** for centralized configuration management |
| Backend (Infra) | Databases | Using **MongoDB** for data storage |
| Backend (Infra) | Message Queues | Using **RabbitMQ** as our message broker |
| Backend (Infra) | Registry Manager | Using **Nexus3** for publishing **docker images / java libraries / npm packages**

**Table of Content**
- [Architecture](#architecture)
    - [High Level Overview](#high-level-overview)
    - [In Depth Design Concepts](#in-depth-design-concepts)
- [Getting Started](#getting-started)
    - [Environment Configuration](#prerequisite)
    - [Overview of Apps / Services / API available](#apps--services--api)
- [Contributions](#contributions)

## Architecture

### High Level Overview

![Architecture](doc/images/architecture.png)

### In Depth Design Concepts

1. [Frontend](app-frontend) 
2. [Microservice Backend](app-backend)
3. [API Gateway](app-gateway)
4. [Websocket Implementation](app-backend/ms-notification-service/doc/NOTIFICATION_SERVICE.md#websocket-server-to-client-communication)
5. Message Queue
6. Logging
7. Authentication
8. Kubernetes

## Getting Started

### Prerequisite

Before you can run this project, please follow the instructions on how to [set up your project environment](doc/PROJECT_SETUP.md).

### Apps / Services / API

- **Apps / Services**
    - **6006** -- Storybook ([React Component Library](app-frontend/react-component-library))
    - **7001** -- Microservice ([Web Service](app-backend/ms-web-service))
    - **7002** -- Microservice ([Notification Service - WebSocket](app-backend/ms-notification-service))
        - [WebSocket Topics](app-backend/ms-notification-service/doc/NOTIFICATION_SERVICE.md#topics)
    - **8080** -- [React Web App](app-frontend/react-base-app)
    - **8888** -- [Cloud Config Server](app-backend/ms-config-server)
    - **9090** -- [API Gateway](app-backend/web-api-gateway-nginx)
    - **15672** -- [RabbitMQ](app-backend/rabbitmq)
- **API Endpoints**
    - **Web Service**
        - [Announcements](app-backend/ms-web-service/doc/ANNOUNCEMENT_SERVICE.md)
        - User Info

## Contributions

If you are keen on making contributions. Please adhere to the following rules:
1. Create a branch / fork 
2. Create a pull request to merge your codes to master
3. **DO NOT** edit the master branch directly
