const {createTransport} = require('nodemailer');
const {validate} = require('email-validator');
const {parse} = require('../parse-form');

const {
	GMAIL_PASS,
	GMAIL_ADDRESS,
	CONTACT_FORM_TOKEN,
} = require('../variables');

if (!GMAIL_PASS || !GMAIL_ADDRESS || !CONTACT_FORM_TOKEN) {
	throw new Error('Missing mandatory environment variables GMAIL_PASS, GMAIL_ADDRESS, CONTACT_FORM_TOKEN');
}

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: GMAIL_ADDRESS,
		pass: GMAIL_PASS,
	},
});

module.exports.email = ({to, subject = 'Empty subject', token, ...rest}) => new Promise(
	(resolve, reject) => {
		if (!validate(to)) {
			reject(new Error(`Expected email address in "to" field, instead got [${to}]`));
		}

		if (token !== CONTACT_FORM_TOKEN) {
			reject(new Error(`Expected valid token, instead got [${token}]`));
		}

		const data = {
			from: GMAIL_ADDRESS,
			to,
			subject,
			html: parse(rest),
		};

		transporter.sendMail(
			data,
			(error, info) => {
				if (error) {
					reject(error);
				} else {
					resolve(info);
				}
			}
		);
	}
);
