"use strict";

const express = require('express');
const App = express();
const http = require('http').Server(App);
const IO = require('socket.io')(http);
const User = require('./lib/server_user');
const Port = process.env.PORT || 3000;
const DNS = require('dns');
const OS = require('os');


App.use(express.static('public'))

App.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

IO.on('connection', function(socket){
  	var new_user = new User(socket.id);
  	socket.emit('registered', new_user);
	socket.on('user:registered', function(data){
		console.log(data);
		IO.emit('user:registered', data);
	});
	socket.on('user:update', function(data){
		console.log(data);
		IO.emit('user:update', data);
	});
	socket.on('disconnect', function(){
		IO.emit('user:disconnect', socket.id);
	});
});

http.listen(Port, function(){
	DNS.lookup(OS.hostname(), function (error, address, family) {
		console.log(`Listening on ${address}:${Port}`);
	})
});


