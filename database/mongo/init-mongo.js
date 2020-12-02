// This data will be inserted into database given by 'MONGO_INITDB_DATABASE' environment variable.
// If the environment variable is not set then it will be inserted into database name 'test'

db.createUser({
    user: 'user',
    pwd: '123',
    roles: ["readWrite"]
});

db.createCollection("announcements");
