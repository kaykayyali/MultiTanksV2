var Game = function() {
	this.game = new Phaser.Game(1000, 480, Phaser.AUTO, 'game');
	this.apply_states();
	this.start_game();
	return this.game;
};

Game.prototype.apply_states = function() {
	this.game.state.add('boot', Boot_State);
	this.game.state.add('load', Load_State);
	this.game.state.add('menu', Menu_State);
	this.game.state.add('game', Game_State);
};

Game.prototype.start_game= function() {
	this.game.state.start('boot');
};