# Notification Service  (Microservice)

This is a micro-service which primary handles web socket connection with the frontend

## Folder Structure

```
root/src/main
├── kotlin
    └── com.javawebapp.notification
        ├── config              # custom configurations
        └── util                # utility / helper functions
└── resources                 
```

## Usage

- **Run this microservice**
    - `./gradlew bootRun`

## Future Works

- Security Implementation
- API Gateway


## References
- [Spring Docs](HELP.md)
- [[VIDEO] WebSockets using Spring Boot Example](https://www.youtube.com/watch?v=OK2Fn6k7pwo)
- [Spring Boot + WebSocket Example](https://www.devglan.com/spring-boot/spring-boot-websocket-example)
- [Using Spring Boot for WebSocket Implementation with STOMP](https://www.toptal.com/java/stomp-spring-boot-websocket)
- [StompJS in 5 minutes](https://medium.com/@debanjanamaitra/stomp-js-in-5-minutes-30ebfb9d6e9a)
- [WebSockets with Spring Boot](https://blog.joshmlwood.com/websockets-with-spring-boot/)
- [CORS and Spring WebSocket](https://stackoverflow.com/questions/47239476/cors-and-spring-websocket)
