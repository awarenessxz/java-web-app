# Web API Gateway (using Nginx)

Simple API Gateway to enable request rerouting. Possible responsibilities includes **authentication, monitoring, load
balancing, caching, request shaping and management, and static response handling**

## Getting Started

### Start API Gateway / Reverse Proxy

1. Build the nginx docker image
    - `sudo docker build -t apigateway_image .`

2. Run an instance of the docker image
    - `sudo docker run --name apigateway --net=host -d apigateway_image`
    - **Notes:**
        - Network Mode = `host` -- is meant for linking machine's localhost to docker localhost

### Delete API Gateway / Reverse Proxy

1. Delete the Container
    - `sudo docker rm -f apigateway`

2. Delete the Docker image
    - `sudo docker rmi apigateway_image`
        
### Other useful commands

- `sudo docker pull nginx` -- pull nginx docker image
- `sudo docker images` -- list all docker images on local machine
- `sudo docker ps` -- show active running instances
- `sudo docker ps -a` -- show all instances
- `sudo docker rm <CONTAINER_ID>` -- delete container instance
- `sudo docker run -p 9090:80 --name apigateway -d nginx` -- Run default config for Nginx Image

## References

- [API Gateway Pattern](https://microservices.io/patterns/apigateway.html)
- [Optimizing Netflix API](https://netflixtechblog.com/optimizing-the-netflix-api-5c9ac715cf19)
- [Building Microservice using an API Gateway](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)
- [Bad Request for Nginx Docker](https://stackoverflow.com/questions/38346847/nginx-docker-container-502-bad-gateway-response)
- [Deploying Nginx Docker](https://www.nginx.com/blog/deploying-nginx-nginx-plus-docker/)
- [How to access server on localhost with nginx docker container](https://stackoverflow.com/questions/27810076/how-do-i-access-a-server-on-localhost-with-nginx-docker-container)
- [How to configure Nginx for websocket](https://www.serverlab.ca/tutorials/linux/web-servers-linux/how-to-configure-nginx-for-websockets/)
