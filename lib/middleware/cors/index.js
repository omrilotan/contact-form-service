const cors = require('cors');
module.exports = () => cors(delegate);

/**
 * returns CORS options per request
 * @param  {Request}   request
 * @param  {Function}  callback Callback expects two parameters: error and options
 * @return {undefined}
 */
function delegate(request, callback) {
    callback(null, {
        credentials: true,
        origin: true,
    });
}
