var express = require('express');
var path = require('path');
var http = require('http');
// var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var personCounter = 0;

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/count', function(req, res){
    var field = req.param("field");
    console.log(field);
    
    if (field==1){
        personCounter++;
    }else{
        personCounter--;   
    }
    
    io.emit('arduino', personCounter);
    res.json({});

});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;




app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    //Envio el mensaje blink_delay con valor 255 cuando el usuario se conecta
    io.emit('arduino', personCounter);
});


