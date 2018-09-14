const express = require('express');
const app = express();
const s = require('../controllers/aws');

app.get('/', (req, res, next) => {
    
    s.getAllImages()
    .then((results) => {
        res.render('../public/gallery', {results: results});
    }).catch((err) => {
        throw err;
    })
})

module.exports = app;