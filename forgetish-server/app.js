var express = require('express');
require('express-async-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cardRouter = require('./routes/card');
var categoryRouter = require('./routes/category');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardRouter);
app.use('/categories', categoryRouter);

app.use(function (err, req, res, next) {
  res.status(500);
  res.send({error: err});
});

module.exports = app;
