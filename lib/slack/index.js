const https = require('https');
const url = require('url');
const {
	SLACK_WEBHOOK,
	SLACK_CHANNEL,
} = require('../variables');
const {name} = require('../../package.json')

/**
 * Posts webhook with the data
 * @param  {Object} data Data object
 * @return {Promise}
 */
module.exports.slack = ({title = `Message from ${name}`, message}) => new Promise((resolve, reject) => {
	if (!SLACK_WEBHOOK) {
		reject(new Error('No environment variable for webhook'));
	}

	const {
		hostname,
		path,
	} = url.parse(SLACK_WEBHOOK);

	const options = {
		hostname,
		port: 443,
		path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	};

	const req = https.request(
		options,
		res => {
			res.setEncoding('utf8');
			res.on('end', resolve);
			res.on('data', resolve);
		}
	);

	const data = {
		attachments: [{
			color: "#27ae60",
			author_name: name,
			title,
			text: message,
		}],
		channel: SLACK_CHANNEL,
		username: name,
		icon_emoji: ':email:'
	};

	req.on('error', reject);
	req.write(JSON.stringify(data));
	req.end();
});
