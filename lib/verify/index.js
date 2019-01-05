const {CONTACT_FORM_TOKEN} = require('../variables');

module.exports.verify = token => {
	if (token !== CONTACT_FORM_TOKEN) {
		throw new Error(`Expected valid token, instead got [${token}]`);
	}
}
