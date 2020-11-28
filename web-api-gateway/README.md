# Web API Gateway

Simple API Gateway to enable request rerouting. Possible responsibilities includes **authentication, monitoring, load
balancing, caching, request shaping and management, and static response handling**

## Usage

1. **Start the API Gateway**
    - `yarn install`
    - `yarn start`

2. **Register API to the API Gateway**
    - When you start your API, call this endpoint `http//API_GATEWAY_URL/register` to register your API to the API gateway.
    - Using a `POST` request, pass in the following data
        ```
        {
            apiName: 'fakeapi',
            host: 'http://localhost'
            port: 3001
        }
        ```
    - Test using the following curl command
        - `curl -X POST -d '{"apiName": "registryTest", "host": "http://localhost", "port": "3001" }' -H "Content-Type: application/json" http://localhost:4000/register`

3. **Unregister API from API Gateway**
    - Remove API using this curl command
        - `curl -X POST -d "apiName=API_TO_REMOVE" http://localhost:4000/unregister`

## References

- [Creating Simple API Gateway with Node-JS](https://medium.com/hackernoon/creating-simple-api-gateway-using-node-js-6d5933c214b8)
- [Fast-Gateway](https://medium.com/sharenowtech/node-js-api-gateway-a-developer-perspective-8defe575ed21)
- [Build an API gateway using nodejs](https://blog.risingstack.com/building-an-api-gateway-using-nodejs/)
- [[VIDEO] - Express JS - Creating an API Gateway](https://www.youtube.com/playlist?list=PLMFjx2r0Yjipjl31vnoFnUt5tnN50SCAb)
