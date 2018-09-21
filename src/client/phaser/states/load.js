var Load_State = {
	preload: function() {
		console.log("Initialized Load State.");
		this.loading_label = Game_Client.game.add.text(80, 150, 'Loading: Audio', {font: '30px Courier', fill: '#ffffff'});
		Game_Client.game.load.audio('intro', ['assets/audio/intro_2.wav']);
		Game_Client.game.load.audio('jump', ['assets/audio/jump_2.wav']);
		Game_Client.game.load.audio('laser', ['assets/audio/laser.wav']);

		this.loading_label.setText('Loading: Images');
		Game_Client.game.load.image('background', 'assets/images/background_2.jpg');
		Game_Client.game.load.image('bird_one', 'assets/images/bird_one.png');
		Game_Client.game.load.image('bird_two', 'assets/images/bird_two.png');
		Game_Client.game.load.image('bird_three', 'assets/images/bird_three.png');
		Game_Client.game.load.image('star', 'assets/images/star.png');
		Game_Client.game.load.image('ship', 'assets/images/ship.png');
		Game_Client.game.load.image('bullet', 'assets/images/laser.png');
		Game_Client.game.load.image('player', 'assets/images/player_stand.png');
		Game_Client.game.load.image('platform', 'assets/images/platform.png');
		Game_Client.game.load.image('platform_ice', 'assets/images/platform_ice.png');
		Game_Client.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
		Game_Client.game.load.spritesheet('other_dude', 'assets/images/other_dude.png', 32, 48);
		Game_Client.game.load.atlas('dpad', 'assets/joystick/dpad.png', 'assets/joystick/dpad.json');

		this.loading_label.setText('Loading: Scripts');
		Game_Client.game.load.script('joystick', 'assets/js/phaser-virtual-joystick.min.js');
		this.loading_label.setText('Loading: Complete');
	},
	create: function () {
		Game_Client.game.state.start('menu');
	}
};