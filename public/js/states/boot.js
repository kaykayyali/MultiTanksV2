var Boot_State = {
	preload: function() {
		console.log("Initialized Boot State.");
	},
	create: function() {
		Game_Client.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		Game_Client.game.renderer.renderSession.roundPixels = true;
		Game_Client.game.physics.startSystem(Phaser.Physics.ARCADE);
		Game_Client.game.state.start('load');
	}
};