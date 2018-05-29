function init(app){

    app.get('/', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        res.json("This is unwanted request");
    });

    app.use('/chat',require('./chat'));
    app.use('/chat/message',require('./message'));
    app.use('/chat/sendmail',require('./mail'));
    app.use('/chat/emails',require('./getemails'))
    app.use('/chat/updateemail',require('./updateemails'))  
}

module.exports = {
    init:init
}

