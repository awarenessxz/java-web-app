# App Infrastructure

These are the backbones required for by the application.

## Folder Structure

There are multiple components that are being experimented. Refer to the folder structure below to know what each project
is about.

```
root
├── config-server     # Centralized Config Server
├── database          # MongoDB
└── rabbitmq          # Message Queue
```
 
## Usage

1. Start the databases
   ```bash
   cd database
    
   # Clean Data for fresh state
   cd mongodata
   sudo rm -rf *
   cd ..
    
   # Start Mongo Cluster
   sudo docker-compose up -d
   
   # Stop Mongo Cluster
   sudo docker-compose down -v
   ```

2. Start Config Server
   ```bash
   cd config-server
   ./gradlew bootRun
   ```

3. Start RabbitMQ
   ```bash
   cd rabbitmq
   
   # Clean Data for fresh state
   cd storage
   sudo rm -rf *
   cd ..
   
   # Start rabbitmq cluster
   sudo docker-compose up -d
   
   # Stop rabbitmq cluster
   sudo docker-compose down -v   
   ```
