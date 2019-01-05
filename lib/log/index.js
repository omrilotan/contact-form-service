const {name} = require('../../package.json');
const {slack} = require('../slack');

module.exports.log = async error => slack(
	{
		title: `Error from ${name}`,
		message: [error.message, error.stack.toString()].join('\n'),
		channel: '#error-logs',
	}
).catch(() => null);
