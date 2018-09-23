// Primary Service file, responsible for serving game assets, and maintaining data continuity over the socket connection.



import Express from 'express';
import HTTP from 'http';
import SOCKETIO from 'socket.io';
import DNS from 'dns';
import OS from 'os';
import {Client_Manager} from './client_manager.mjs'

const App = Express();
const http = HTTP.Server(App);
const IO = SOCKETIO(http);
const Port = process.env.PORT || 3000;

class Primary_Service {
	constructor(options) {
		this.options = options || {};
		this.client_manager = new Client_Manager(IO);
	}
	start () {
		// Register Express static assets and frontend package
		App.use(Express.static('build'));
		App.use(Express.static('public'));
		App.get('/', (req, res) => {
			res.sendFile(__dirname + '/public/index.html');
		});

		// Init Client management
		this.client_manager.start();

		// Handle incoming socket connections
		IO.on('connection', (socket) => {
			this.client_manager.authorize_new_client(socket);
		});

		// Distribute client assets over http
		http.listen(Port, function(){
			DNS.lookup(OS.hostname(), function (error, address, family) {
				console.log(`Listening on ${address}:${Port}`);
			})
		});
	}
}

export {Primary_Service};


