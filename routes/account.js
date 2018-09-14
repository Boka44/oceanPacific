const express = require('express');
const app = express();
const Content = require('../models/content');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('isAuthenticated')
      return next();
    };
    res.redirect('/login');
  }

app.get('/', isAuthenticated, (req, res, next) => {
    Content.find({}, (err, doc) => {
        res.render('../public/account', {
            content: doc[0]
        })
    })
})

app.post('/summary', (req, res, next) => {
    const text = req.body.textSummary;
    Content.findOneAndUpdate({}, { summary: text }, (err, doc) => {
        res.redirect('back');
    })
})

app.post('/about', (req, res, next) => {
    const text = req.body.textAbout;
    Content.findOneAndUpdate({}, { about: text }, (err, doc) => {
        res.redirect('back');
    })
})



module.exports = app;