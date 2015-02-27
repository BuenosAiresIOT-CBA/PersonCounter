var express=require('express');
var app = express();
var http = require('http');
var path = require('path');
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

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    //Envio el mensaje blink_delay con valor 255 cuando el usuario se conecta
    io.emit('arduino', personCounter);
});

