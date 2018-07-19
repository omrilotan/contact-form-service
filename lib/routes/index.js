module.exports = app => {
    app.get('/', require('./root'));
    app.get('/ping', require('./ping'));
    app.post('/v1/send', require('./send'));
    app.use('*', require('./root'));
};
