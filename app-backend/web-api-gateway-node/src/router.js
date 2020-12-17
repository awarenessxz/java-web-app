/* Combine all the services endpoints */
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const registry = require('./registry.json');
const router = express.Router();

router.all('/rest/:apiName/:path', (req, res) => {
    const api = registry.services[req.params.apiName];
    if (api) {
        axios({
            method: req.method,
            url: api.url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then(apiResponse => {
            res.send(apiResponse.data);
        }).catch(error => {
            res.send(error);
        });
    } else {
        res.status(404).send("API does not exist!");
    }
});

// Server Registration Endpoint (Adding API to the registry)
router.post('/register', (req, res) => {
    const params = req.body;
    // validate data
    if (params.apiName === undefined || params.port === undefined || params.host === undefined) {
        res.status(400).send("Invalid Params! - Please provide a json object with { apiName, port, host }");
    } else {
        const registrationInfo = {
            apiName: params.apiName,
            host: params.host,
            port: params.port,
            url: params.host + ":" + params.port + "/"
        }
        registry.services[registrationInfo.apiName] = { ... registrationInfo };
        fs.writeFile('./src/registry.json', JSON.stringify(registry, null, 4), (error) => {
            if (error) {
                res.status(500).send("Gateway could not register API, please try again...");
            } else {
                res.status(200).send("Successfully registered '" + registrationInfo.apiName + "'");
            }
        });
    }
});

// Remove API from registry
router.post('/unregister', (req, res) => {
    const params = req.body;
    if (params.apiName) {
        if (registry.services[params.apiName]) {
            delete registry.services[params.apiName];
            fs.writeFile('./src/registry.json', JSON.stringify(registry, null, 4), (error) => {
                if (error) {
                    res.status(500).send("Gateway could not unregister API, please try again...");
                } else {
                    res.status(200).send("Successfully unregistered '" + params.apiName + "'");
                }
            });
        } else {
            res.status(404).send("api '" + params.apiName + "' is not found!");
        }
    } else {
        res.status(400).send("Invalid Params! - Please provide a json object with { apiName }");
    }
});

module.exports = router;
