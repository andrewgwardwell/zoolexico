var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var logger = require('logger');
var http = require('http').Server(app);
var path = require('path');
var words = require('./routes/words');
var io = require('socket.io')(http);
//var stream = require('./routes/stream');


app.use(express.static(path.join(__dirname, '../', '/')));
app.use(bodyParser());

app.get('/words', words.findAll);
//res.sendFile(path.join(__dirname, '../', 'index.html'));

app.get('/words/:name', words.findByName);

app.post('/words/add', [words.addWord, function(req, res){
    io.emit('word_added', '');
}]);

//app.put('/words/:id', words.updateWord);

io.on('connection', function(socket){
    console.log('a user connected boom');
    io.emit('connected', 'user new');
    socket.on('disconnect', function(){
        io.emit('disconnected', 'user gone');
    });

    socket.on('connect', function(msg){
        io.emit('chat again', msg);
    });
});


http.listen(3000, 'localhost', function(){
   console.log('listening on 3000');
});
