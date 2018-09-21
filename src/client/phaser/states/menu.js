var Menu_State = {
	preload: function() {
		console.log("Initialized Menu State.");
		this.background_music = Game_Client.game.add.audio('intro');
		this.background_music.loop = true;
		this.background_music.play();
		// Game_Client.game.input.onDown.add(this.go_full, this);
		Game_Client.game.input.onDown.add(this.transition_to_game, this);
	},
	create: function () {
		this.create_background();
		this.create_space_emitter();
		this.create_instructions();
		this.assign_keys();
	},
	update: function() {
		this.background.tilePosition.y += 1;
		if (this.main_key.isDown) {
			this.transition_to_game();
		}
	},
	go_full: function() {
		if (Game_Client.game.scale.isFullScreen) {
			Game_Client.game.scale.stopFullScreen();
		}
		else {
			Game_Client.game.scale.startFullScreen(false);
		}
	},
	assign_keys: function() {
		this.main_key = Game_Client.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	create_background: function() {
		this.background = Game_Client.game.add.tileSprite(0, 0, 1000, 480, 'background');
	},
	create_space_emitter: function() {
		this.space_emitter = Game_Client.game.add.emitter(850, 0, 5);
		this.space_emitter.makeParticles(['star', 'ship']);
		this.space_emitter.setXSpeed(-5, 5);
		this.space_emitter.setYSpeed(300,500);
		this.space_emitter.setRotation(-100, 100);
		this.space_emitter.start(false, 1600, 900);

		this.space_emitter_two = Game_Client.game.add.emitter(650, 0, 5);
		this.space_emitter_two.makeParticles(['star', 'ship']);
		this.space_emitter_two.setXSpeed(-5, 5);
		this.space_emitter_two.setYSpeed(300,500);
		this.space_emitter_two.setRotation(-100, 100);
		this.space_emitter_two.start(false, 1800, 1025);

		this.space_emitter_three = Game_Client.game.add.emitter(400, 0, 5);
		this.space_emitter_three.makeParticles(['star', 'ship']);
		this.space_emitter_three.setXSpeed(-5, 5);
		this.space_emitter_three.setYSpeed(300,500);
		this.space_emitter_three.setRotation(-100, 100);
		this.space_emitter_three.start(false, 2200, 500);

		this.space_emitter_four = Game_Client.game.add.emitter(150, 0, 5);
		this.space_emitter_four.makeParticles(['star', 'ship']);
		this.space_emitter_four.setXSpeed(-5, 5);
		this.space_emitter_four.setYSpeed(300,500);
		this.space_emitter_four.setRotation(-100, 100);
		this.space_emitter_four.start(false, 2400, 600);
	},
	create_instructions: function() {
		this.main_label = Game_Client.game.add.text(0, 0, 'Super Action Multi Scroller', {font: '30px Courier', fill: '#fff', boundsAlignH: "center", boundsAlignV: "middle" });
		this.main_label.setTextBounds(0, 25, 1000, 50);
		this.bar = Game_Client.game.add.graphics();
		this.bar.beginFill(0x000000, 0.2);
		this.bar.drawRect(0, 300, 1000, 50);
		var style = { font: "20px Courier", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		//  The Text is positioned at 0, 100
		this.instruction_label = Game_Client.game.add.text(0, 0, 'Space or Touch to play', style);
		this.instruction_label.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		//  We'll set the bounds to be from x0, y100 and be 1000px wide by 100px high
		this.instruction_label.setTextBounds(0, 300, 1000, 50);
	},
	transition_to_game: function() {
		this.background_music.stop();
		Game_Client.game.state.start('game');
	}
};