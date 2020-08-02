const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { expressLogger } = require('./helpers/logger');

require('./database');

const parkingsRouter = require('./routes/parkings-route');
const taxisRouter = require('./routes/taxis-route');

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/parkings', parkingsRouter);
app.use('/taxis', taxisRouter);

module.exports = app;
