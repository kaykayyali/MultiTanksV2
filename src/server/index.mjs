"use strict";

import Express from 'express';
import HTTP from 'http';
import SOCKETIO from 'socket.io';
import DNS from 'dns';
import OS from 'os';

const App = Express();
const http = HTTP.Server(App);
const IO = SOCKETIO(http);
const Port = process.env.PORT || 3000;

class Primary_Service {
	constructor(options) {
		this.options = options || {};
	}
	start () {
		App.use(Express.static('public'))

		App.get('/', function(req, res){
			res.sendFile(__dirname + '/public/index.html');
		});

		IO.on('connection', function(socket){
			let new_user = new User(socket.id);
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
	}
}

export {Primary_Service};


