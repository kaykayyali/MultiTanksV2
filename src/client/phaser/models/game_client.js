var Game_Client = {
	init: function() {
		console.log("Game initializing.");
		this.init_game();
	},
	init_game: function() {
		this.game = new Game();
		this.has_started = true;
	}
};