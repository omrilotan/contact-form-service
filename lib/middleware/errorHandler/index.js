module.exports = () => async (error, request, response) => {
    let {status = 500} = error;
    error.message = `${error.message}. path: ${request.path}, route: ${request.route && request.route.path}`;

    response.headersSent || response.status(status).type('txt');
    response.send(error.message || 'Server error, please check logs');
};
