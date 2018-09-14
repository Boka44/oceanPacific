const express = require('express');
const app = express();
const Content = require('../models/content');

app.get('/', (req, res, next) => {
    Content.find({}, (err, doc) => {
        if(doc.length !== 0) {
            res.render('../public/index', {
                content: doc[0]
            });
        } else {
            res.render('../public/index');
        }    
    })
})

module.exports = app;