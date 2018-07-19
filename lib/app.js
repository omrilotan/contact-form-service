const {name, version} = require('../package.json');
const express = require('express');
const app = express();
const {PORT = 1337} = process.env;
const {slack} = require('./slack');

const {
	middleware,
	errorHandler,
} = require('./middleware');

process.on(
	'unhandledRejection',
	error => slack({title: `Error from ${name}`, message: error.message}).catch(() => null)
);

app.set('port', PORT);
middleware(app);
require('./routes')(app);
errorHandler(app);

app.listen(
	PORT,
	() => slack({title: `Application ${name}@${version} started running`}).catch(() => null)
);
