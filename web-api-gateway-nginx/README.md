# Web API Gateway (using Nginx)

Simple API Gateway to enable request rerouting. Possible responsibilities includes **authentication, monitoring, load
balancing, caching, request shaping and management, and static response handling**

## Getting Started

1. You will need to install docker in order to run this project. Below are some useful commands that you will need
    - List all docker images on local machine
        - `sudo docker images`
    - Check for any running instances
        - `sudo docker ps` -- only shows active instances
        - `sudo docker ps -a`
    - Delete running instances
        - `sudo docker rm <CONTAINER_ID>`

2. Pull Nginx docker image from [docker hub](https://hub.docker.com)
    - `sudo docker pull nginx`

3. Run the Nginx docker image
    - `sudo docker run -p 8080:80 nginx`

## References

- [API Gateway Pattern](https://microservices.io/patterns/apigateway.html)
- [Optimizing Netflix API](https://netflixtechblog.com/optimizing-the-netflix-api-5c9ac715cf19)
- [Building Microservice using an API Gateway](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)
