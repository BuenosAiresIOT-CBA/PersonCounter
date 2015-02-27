var express=require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var personCounter = 0;

app.use(express.static(path.join(__dirname, 'public')));

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

io.on('connection', function (socket) {
    //Envio el mensaje blink_delay con valor 255 cuando el usuario se conecta
    io.emit('arduino', personCounter);
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});