define([
        'jquery',
        'io'
    ],
    function($, io){
        // frontend end section of this code
        var socket = io();
        $('form').submit(function(){
            socket.emit('chat', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('disconnected', function(data){
            $('#messages').append($('<li>').text(data));
        });
        socket.on('connected', function(data){
            $('#messages').append($('<li>').text(data));
        });
        socket.on('chat again', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
        socket.on('word_added', function(){
            alert('new Word');
        });
        return socket;
    });