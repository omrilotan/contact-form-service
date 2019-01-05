const {slack} = require('../../slack');
const {verify} = require('../../verify');

const {
	SUCCESS_MESSAGE = 'Thank you',
} = require('../../variables');

module.exports = async (request, response) => {
	try {
		const {
			author_name = `Message from ${request.get('Origin')}`,
			title,
			from,
			token,
			...rest
		} = Object.assign(
			{},
			request.query,
			request.fields
		);

		verify(token);

		await slack({
			author_name,
			title,
			username: from,
			message: parse(rest, ([key, value]) => `*${key}*: ${value}`),
		});

		response.headersSent || response.status(201).type('txt');
		response.send(SUCCESS_MESSAGE);
	} catch (error) {
		const {message} = error;

		response.headersSent || response.status(400).type('txt');
		response.send(message);
	}
};

const parse = obj => Object.entries(obj)
	.reduce(
		(accumulator, [key, value]) => [...accumulator, `*${key}*: ${value}`],
		[]
	).join('\n');
