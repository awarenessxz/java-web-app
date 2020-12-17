# Fake API Testing

- Without Gateway
    1. `curl localhost:3001/fakeapi`
- With Gateway
    1. Start `web-api-gateway-node`
    2. `curl localhost:9090/rest/testapi/fakeapi`
    