var Client = {
	init: function() {
		this.connect_to_socket_server();
	},
	connect_player: function() {
		this.connection.emit('user:registered', this.user);
		this.start_updates();
	},
	connect_to_socket_server:  function() {
		var self = this;
		this.connection = io();
		this.connection.on('connect', _.bind(this.handle_socket_connect, this));
		this.known_users = {};
	},
	handle_socket_connect: function(socket) {
		console.log('Connected');
		this.apply_socket_listeners();
	},
	apply_socket_listeners: function() {
		this.connection.on('registered', _.bind(this.handle_registered, this));
		this.connection.on('user:registered', _.bind(this.handle_user_registered, this));
		this.connection.on('user:update', _.bind(this.handle_user_updated, this));
		this.connection.on('user:disconnect', _.bind(this.handle_user_disconnected, this));
	},
	handle_user_disconnected: function(socket_id) {
		console.log('Deleting ', socket_id);
		delete this.known_users[socket_id];
	},
	handle_registered: function(user) {
		this.user = user;
		console.log('User is ', user);
		if (!Game_Client.has_started) {
			Game_Client.init();
		}
	},
	handle_user_registered: function(user) {
		if (user.id === this.user.id) {
			return;
		}
		this.known_users[user.id] = user;
		console.log('New User is', user);
	},
	handle_user_updated: function(user) {
		if (user.id === this.user.id) {
			return;
		}
		this.known_users[user.id] = user;
		// console.log('User update recieved', user);
	},
	start_updates: function() {
		this.update = setInterval(_.bind(this.update_all, this), 100);
	},
	stop_uppdates: function() {
		delete this.update;
	},
	update_all: function() {
		this.connection.emit('user:update', this.user);
	}
};