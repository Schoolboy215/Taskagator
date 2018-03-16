const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const sessionConfig = require('./config/session');
 
const ensureAuthenticated = require('./routes/ensureAuthenticated');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: sessionConfig.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'dist')));

//Passport setup
app.use(passport.initialize());
app.use(passport.session());
 
require('./routes/api')(app).then(result => {
    app.use('/api', result);

    app.get('*', ensureAuthenticated.ensureAuthenticated, function(req,res,next) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

    //Start the server
    const server = http.createServer(app);
    server.listen(3000, function() {
        var host = 'localhost';
        var port = server.address().port;
        console.log('App listening at http://%s:%s', host, port);
    });
});
module.exports = app;