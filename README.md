# java-web-app

Experimenting with a Java Web Application built with the following components
- **React Frontend** (Main frontend)
- **Custom React Reusable Component Library**
- **Micro Frontend** (to be loaded into main frontend)
- **Config Server as a Microservice** (with feature toggle)
- **Microservices**
- **Message Queues**

![Architecture](./doc/architecture.png)

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