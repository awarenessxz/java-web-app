# Admin Service  (Microservice)

This is a micro-service which serves as a centralised service for all admin related business logics.

## Folder Structure

```
root/src/main
├── kotlin
    └── com.javawebapp.admin
        ├── controller*         # [ENTRYPOINT] HTTP requests are handled by a REST controller
        ├── entity              # Database related
        ├── exception           # Custom Exceptions (start point = ApiExceptionHandler.kt)
        ├── repository          # Database related
        └── service             # Contains all the business logic
└── resources                 
```

## References
- [Spring Docs](HELP.md)
- [[VIDEO] Rest API with spring boot](https://www.youtube.com/playlist?list=PLdW9lrB9HDw101ImXtR_xkvTe1HWx7Gc6)
- [Exceptions for APIs, consistency without chaos (with Kotlin/Spring Boot example)](https://humancaching.com/2019/07/02/exceptions-for-apis-consistency-without-chaos-with-kotlin-spring-boot-example/)
