const {email} = require('../../email');
const {log} = require('../../log');
const {SUCCESS_MESSAGE = 'Thank you'} = require('../../variables');

module.exports = async (request, response) => {
	try {
		await email(Object.assign(
			{},
			request.query,
			request.fields
		));

		const message = [
			`*sent to*: ${request.query.to}`,
			...Object.entries(request.fields).map(
				([key, value]) => [`*${key}*`, value].join(': ')
			),
			'',
			`*Request*: ${[
				request.get('user-agent'),
				request.get('x-forwarded-for'),
				request.get('referer')
			].filter(Boolean).join(', ')}`
		].join('\n')

		log.message(message)

		response.headersSent || response.status(201).type('txt');
		response.send(SUCCESS_MESSAGE);
	} catch (error) {
		const {message} = error;

		response.headersSent || response.status(400).type('txt');
		response.send(message);
	}
};
