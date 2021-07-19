const {name} = require('../../package.json');
const {slack} = require('../slack');

module.exports.log = {
	error: async error => slack(
		{
			title: `Error from ${name}`,
			message: [error.message, error.stack.toString()].join('\n'),
			channel: '#logs',
		}
	).catch(() => null),
	message: message => slack(
		{
			title: `Message from ${name}`,
			message,
			channel: '#logs',
		}
	)
};
