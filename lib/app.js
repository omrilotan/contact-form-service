const {hostname} = require('os');
const {name, version} = require('../package.json');
const express = require('express');
const app = express();
const {PORT = 1337} = process.env;
const {slack} = require('./slack');
const {log} = require('./log');

const {
	middleware,
	errorHandler,
} = require('./middleware');

process.on(
	'unhandledRejection',
	error => log(error)
);

app.set('port', PORT);
middleware(app);
require('./routes')(app);
errorHandler(app);

app.listen(
	PORT,
	() => slack({title: `Application ${name}@${version} started on ${hostname()}`}).catch(() => null)
);
