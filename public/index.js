var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var personCounter = 0;

var _dirname = "/Users/francoagustinrabaglia/Desktop/IoT/PersonCounter/node/"

app.get('/', function (req, res) {
    res.sendFile(_dirname + 'index.html');
});

app.get('/lib/jquery-1.11.1.min.js', function (req, res) {
    res.sendFile(_dirname + '/lib/jquery-1.11.1.min.js');
});

app.get('/css/style.css', function (req, res) {
    res.sendFile(_dirname + '/css/style.css');
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

io.on('connection', function (socket) {
    //Envio el mensaje blink_delay con valor 255 cuando el usuario se conecta
    io.emit('arduino', personCounter);
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});