import {EventEmitter} from 'events'

class Client extends EventEmitter {
	constructor(IO, socket) {
		super();
		if (!socket) {
			throw Error('No Socket for new Client');
		}
		this.IO = IO;
		this.socket = socket
		this.id = this.socket.id;
		this.state = {
			id: this.id
		};
		this.attach_listeners();
	}
	attach_listeners() {
		this.socket.on('user:registered', this.handle_user_registered.bind(this));
		this.socket.on('user:update', this.handle_user_update.bind(this));
		this.socket.on('disconnect', this.handle_disconnect.bind(this));
	}
	authorize_registration() {
		this.socket.emit('registered', this.state);
	}
	handle_disconnect() {
		this.IO.emit('user:disconnect', this.socket.id);
		this.emit('disconnected', this.state);
	}
	handle_user_registered(data) {
		this.emit('user:registered', this);
		this.IO.emit('user:registered', data);
	}
	handle_user_update(data) {
		this.state = data;
		this.IO.emit('user:update', data);
	}
	register_socket(socket) {
		this.socket = socket;
		this.attach_listeners();
		this.handle_complete_registration();
	}
};



export {Client};