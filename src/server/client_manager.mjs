// Client Manager file, responsible for managing client connections, and simple system logging

import {Client} from './models/client.mjs'
import Lag from 'event-loop-lag'

const lag = Lag(1000);

class Client_Manager {
	constructor(IO) {
		this.IO = IO;
		this.connections = {};
	}
	log(message) {
		console.log(`${Date.now()} ${message}`);
	}
	start() {
		this.logging_interval = setInterval(() => {
			this.log(`STATUS Lag: ${Math.round(lag())}ms - Clients: ${Object.keys(this.connections).length}`);
		}, 2500);
	}
	authorize_new_client(socket) {
		let new_client = new Client(this.IO, socket);
		new_client.authorize_registration();
		this.register_new_client(new_client);
		new_client.on('user:registered', this.handle_client_registered.bind(this));
		new_client.on('disconnected', this.handle_client_disconnect.bind(this));
	}
	handle_client_disconnect(client) {
		delete this.connections[client.id];
	}
	handle_client_registered(client) {
		this.log(`${client.id} registered`);
		this.IO.emit('user:registered', client.state);
	}
	register_new_client(client) {
		this.connections[client.id] = client;
	}
}

export {Client_Manager};