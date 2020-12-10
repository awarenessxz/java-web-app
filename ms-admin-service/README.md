# Admin Service  (Microservice)

This is a micro-service which serves as a centralised service for all admin related business logics.

## Folder Structure

```
root/src/main
├── kotlin
    └── com.javawebapp.admin
        ├── config              # custom configurations
        ├── controller*         # REST controller
        ├── entity              # Database related
        ├── exception           # Custom Exceptions (start point = ApiExceptionHandler.kt)
        ├── repository          # Database related
        ├── service             # Contains all the business logic
        └── util                # utility / helper functions
└── resources                 
```

## Usage

- **Run this microservice**
    - `./gradlew bootRun`

## Implementation

- [Announcement Feature](doc/ANNOUNCEMENT_FEATURE.md)

## References
- [Spring Docs](HELP.md)
- [[VIDEO] Rest API with spring boot](https://www.youtube.com/playlist?list=PLdW9lrB9HDw101ImXtR_xkvTe1HWx7Gc6)
- [Exceptions for APIs, consistency without chaos (with Kotlin/Spring Boot example)](https://humancaching.com/2019/07/02/exceptions-for-apis-consistency-without-chaos-with-kotlin-spring-boot-example/)
- [ZonedDateTime with Spring Data MongoDB](https://baeldung.com/spring-data-mongodb-zoneddatetime)
- [[GIT sample code] Registering custom ZonedDateTime Converters](https://github.com/golonzovsky/spring-mongo-ZonedDateTime/blob/master/src/main/java/com/example/demo/MongoConversionsApplication.java)
