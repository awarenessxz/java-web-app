const express = require('express');
const axios = require('axios');
const app = express();
const HOST = 'http://localhost';
const PORT = 3001;

app.use(express.json());
app.get('/fakeapi', (req, res, next) => {
    console.log("YOU HIT ME!!");
    res.send('hello from fake api server');
});

app.listen(PORT, () => {
    /*
    axios({
        method: 'POST',
        url: 'http://localhost:9090/register',
        headers: {'Content-Type': 'application/json'},
        data: {
            apiName: 'registryTest',
            host: HOST,
            port: PORT
        }
    })*/
    console.log('fake api server started on port:', PORT);
});
