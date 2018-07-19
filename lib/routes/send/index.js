const {name} = require('../../../package.json');
const {email} = require('../../email');
const {slack} = require('../../slack');
const {SUCCESS_MESSAGE = 'Thank you'} = require('../../variables');

module.exports = async (request, response) => {
	try {
		const result = await email(Object.assign(
			{},
			request.query,
			request.fields
		));

		slack({
			title: `Email sent via ${name}`,
			message: JSON.stringify(result, null, 2),
		}).cacth(() => null);

		response.headersSent || response.status(201).type('txt');
		response.send(SUCCESS_MESSAGE);
	} catch (error) {
		const {message} = error;

		response.headersSent || response.status(400).type('txt');
		response.send(message);

		slack({
			title: `Error from ${name}`,
			message,
		}).cacth(() => null);
	}
};
