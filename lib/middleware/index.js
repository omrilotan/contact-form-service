const formidable = require('express-formidable');
const cors = require('./cors');
const errorHandler = require('./errorHandler');

module.exports = {
	middleware: app => {
		app.use(cors());
		app.use(formidable());
	},
	errorHandler: app => app.use(errorHandler()),
};
