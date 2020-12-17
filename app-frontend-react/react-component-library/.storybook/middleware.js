/**
 * A way to mock api calls in storybook
 * https://dev.to/mattc/how-to-mock-api-calls-in-storybook-1762
 */
const express = require('express');
const bodyParser = require('body-parser');

const infiniteScrollListViewUtil = require("../setup/sb-fake-data/infinitescrolllistview-util");

const expressMiddleWare = router => {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

    // general api end point which returns empty array
    router.get('/api/emptydata', (request, response) => {
        if (request.query.limit && request.query.offset) {
            response.send([]);
        } else {
            response.status(500).send("API Server Error");
        }
    });

    // api endpoint for testing InfiniteScrollListView component
    router.get('/api/infinitescrolllistview/fakedata', (request, response) => {
        if (request.query.limit && request.query.offset) {
            const limit = parseInt(request.query.limit);
            const offset = parseInt(request.query.offset);
            const data = infiniteScrollListViewUtil.getFakeData(limit, offset);
            response.send(data);
        } else {
            response.status(500).send("API Server Error");
        }
    });
};

module.exports = expressMiddleWare;