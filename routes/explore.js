const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.render('../public/explore');
})

module.exports = app;