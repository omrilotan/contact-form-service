const {hostname} = require('os');
const {name, version} = require('../package.json');
const express = require('express');
const {slack} = require('./slack');
const {log} = require('./log');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();
const {
	PORT = 1337,
	SENTRY_DSN
} = process.env;

const {
	middleware,
	errorHandler,
} = require('./middleware');

process.on(
	'unhandledRejection',
	error => log.error(error)
);

if (SENTRY_DSN) {
	Sentry.init({
		dsn: SENTRY_DSN,
		integrations: [
			new Sentry.Integrations.Http({ tracing: true }),
			new Tracing.Integrations.Express({ app }),
		],
		tracesSampleRate: 1.0,
	});
}

app.set('port', PORT);
app.disable('etag');
app.disable('x-powered-by');
SENTRY_DSN && app.use(Sentry.Handlers.requestHandler());
SENTRY_DSN && app.use(Sentry.Handlers.tracingHandler());
middleware(app);
require('./routes')(app);
SENTRY_DSN && app.use(Sentry.Handlers.errorHandler());
errorHandler(app);
app.listen(
	PORT,
	() => slack({
		title: `Application ${name}@${version} started on ${hostname()}`,
		channel: '#logs'
	}).catch(() => null)
);
