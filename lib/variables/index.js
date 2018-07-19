module.exports = [
	'CONTACT_FORM_TOKEN',
	'GMAIL_PASS',
	'GMAIL_ADDRESS',
	'SLACK_WEBHOOK',
	'SLACK_CHANNEL',
	'SUCCESS_MESSAGE',
].reduce(
	(accumulator, item) => Object.assign(
		accumulator,
		{[item]: process.env[item]}
	),
	{}
);
