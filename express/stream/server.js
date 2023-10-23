const express = require('express');

const axios = require('axios');
const { Readable } = require('stream');

const app = express();

app.use('/static', express.static(__dirname + '/public'))


app.listen(3000, () => {
    console.log('Producer server listening on port 3000');
});

