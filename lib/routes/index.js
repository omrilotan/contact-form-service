module.exports = app => {
    app.get('/', require('./root'));
    app.get('/ping', require('./ping'));
    app.post('/v1/email', require('./email'));
    app.post('/v1/slack', require('./slack'));
    app.use('*', require('./root'));
};
