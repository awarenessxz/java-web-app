# Config Server as a Microservice

Centralised configuration server for all Spring Boot Microservices. Instead of using git, I am storing the properties 
files locally.

## Usage

```bash
cd <root>
./gradlew app-infra:config-server:bootRun
```

## References
- [Spring Docs](HELP.md)
- [[VIDEO] Set up spring cloud config server from scratch](https://www.youtube.com/watch?v=gb1i4WyWNK4&list=PLqq-6Pq4lTTaoaVoQVfRJPqvNTCjcTvJB&index=11)
