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

![Architecture](doc/architecture.png)

## Folder Structure

```
root    
├── react-component-library     # Custom React Reusable Component Library
├── react-frontend              # Main Frontend App
├── react-micro-frontend        # Sub Frontend that is consumes by main frontend app  
└── web-api-gateway             # API Gateway  
```

## Useful commands

1. Gradle
    - Inside Root Directory: `gradlew projects` --> list all projects
    - `gradlew tasks --all` --> show all tasks available

## Project Set up

1. **Environment Setup**
    1. [Install Gradle](https://gradle.org/install/#manually)
    2. [Install IntelliJ](https://www.jetbrains.com/help/idea/installation-guide.html#toolbox)
    3. [Install Node-12](https://github.com/nodejs/help/wiki/Installation)
    4. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    5. [Install Java JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
2. **IntelliJ Setup**
    1. Import project into IntelliJ (select `build.gradle.kts` in the root directory)
    2. Follow Instruction on how to setup configuration for Javascript projects
    
## Contributions

If you are keen on making contributions. Please adhere to the following rules:
1. Create a branch / fork 
2. Create a pull request to merge your codes to master
3. **DO NOT** edit the master branch directly

## Documentations

- [Setting up Gradle for Multi Project](doc/CreateProject.md)
- [Create custom reusable React component Library](react-component-library)
