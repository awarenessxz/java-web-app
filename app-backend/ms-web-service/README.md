# Backend Web Service  (Microservice)

This is a micro-service which serves as a centralised service for all web related business logic. Refer to the following 
documentations on the implementation details for all services within this web service.
- [Announcement Service](doc/ANNOUNCEMENT_SERVICE.md)
- User Info

## Folder Structure

```
root/src/main
├── kotlin
    └── com.javawebapp.web
        ├── config              # custom configurations
        ├── controller          # REST controller
        ├── models              # Contains data classes and entitity which are database related
        ├── event               # spring cloud stream + rabbitmq
        ├── exception           # Custom Exceptions (start point = ApiExceptionHandler.kt)
        ├── repository          # Database related
        ├── service             # Contains all the business logic
        └── util                # utility / helper functions
└── resources                 
```

## Usage

- **Run this microservice**
    - `./gradlew bootRun`

## References
- [Spring Docs](HELP.md)
- [[VIDEO] Rest API with spring boot](https://www.youtube.com/playlist?list=PLdW9lrB9HDw101ImXtR_xkvTe1HWx7Gc6)
- [Exceptions for APIs, consistency without chaos (with Kotlin/Spring Boot example)](https://humancaching.com/2019/07/02/exceptions-for-apis-consistency-without-chaos-with-kotlin-spring-boot-example/)
- [ZonedDateTime with Spring Data MongoDB](https://baeldung.com/spring-data-mongodb-zoneddatetime)
- [[GIT sample code] Registering custom ZonedDateTime Converters](https://github.com/golonzovsky/spring-mongo-ZonedDateTime/blob/master/src/main/java/com/example/demo/MongoConversionsApplication.java)
