const {slack} = require('../../slack');

const {
	CONTACT_FORM_TOKEN,
	SUCCESS_MESSAGE = 'Thank you',
} = require('../../variables');

module.exports = async (request, response) => {
	try {
		const {
			title = `Message from ${request.get('Origin')}`,
			from,
			token,
			...rest
		} = Object.assign(
			{},
			request.query,
			request.fields
		);

		if (token !== CONTACT_FORM_TOKEN) {
			throw new Error(`Expected valid token, instead got [${token}]`);
		}

		await slack({
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
