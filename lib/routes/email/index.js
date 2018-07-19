const {email} = require('../../email');
const {SUCCESS_MESSAGE = 'Thank you'} = require('../../variables');

module.exports = async (request, response) => {
	try {
		await email(Object.assign(
			{},
			request.query,
			request.fields
		));

		response.headersSent || response.status(201).type('txt');
		response.send(SUCCESS_MESSAGE);
	} catch (error) {
		const {message} = error;

		response.headersSent || response.status(400).type('txt');
		response.send(message);
	}
};
