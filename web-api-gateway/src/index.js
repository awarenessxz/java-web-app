const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./router');

const PORT = 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/', (req, res) => {
    res.send("API Gateway");
});

app.use(router);

app.listen(PORT, () => {
    console.log("API Gateway running on localhost:", PORT);
});
