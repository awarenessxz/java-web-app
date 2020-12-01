# Database

Using Mongo Docker to create a simple mongo db cluster

## Usage

1. Ensure you have the docker image in your localhost
    - `docker images`
    - `docker pull mongo:latest`
    
2. Run the mongo docker image
    - `docker run -it -d -p 2717:27017 -v ~/path/to/java-web-app/database/mongodata:/data/db --name mongodb mongo`
    - `docker ps` -- check if container is created
    - `docker logs mongodb` -- check logs
    
3. Interact with Mongo
    - `docker exec -it mongodb bash`
    - Inside the shell of the container
        - `mongo` --> launch mongo
        - `use exampleDB` --> set the database
        - `show collections` --> list all the tables created
        
## Other useful commands

### Mongo

- Show databases -- `show dbs`
- Create database -- `use [DATABASE_NAME]`
- Check what database you are in -- `db`
- Delete database
- Create user
    ```
    db.createUser({
        user: "admin",
        pwd: "1234",
        roles: ["readWrite", "dbAdmin"]
    });
    ```
- Create Collection -- `db.createCollection('[NAME_OF_COLLECTION]`);
- List all Collections -- `show collections`
- List items in Collection -- `db.COLLECTION_NAME.find();`


### Docker

- Stop the container -- `docker stop [CONTAINER_ID / CONTAINER_NAME]`
- Remove the container -- `docker rm [CONTAINER_ID / CONTAINER_NAME]`
- Remove the image -- `docker rmi [IMAGE_ID / IMAGE_NAME]`