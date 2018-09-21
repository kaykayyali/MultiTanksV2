var Game_State = {
	preload: function() {
		console.log("Initialized Game State.");
		// Login player
		Client.connect_player();
		var intro = Game_Client.game.add.audio('intro');
		Game_Client.game.time.desiredFps = 60;
		intro.loop = true;
		intro.play();
	},
	create: function () {
		this.set_environment();
		this.create_background();
		this.create_main_player();
		this.create_platforms();
		this.set_physics();
		this.assign_keys();
	},
	update: function() {
		this.player.update();
		this.update_platforms();
		this.update_other_players();
		this.background.tilePosition.y += 1;
	},
	assign_keys: function() {
		this.cursors = Game_Client.game.input.keyboard.createCursorKeys();
		this.jump_key = Game_Client.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	check_delete_players: function() {
		_.each(this.other_players, _.bind(this.check_delete_player, this));
	},
	check_delete_player: function(value, key) {
		if (!Client.known_users[key]) {
			console.log("Deleted a player ", value);
			this.other_players[key].sprite.kill();
			delete this.other_players[key];
		}
	},
	check_new_players: function() {
		_.each(Client.known_users, _.bind(this.check_new_player, this));
	},
	check_new_player: function(value, key) {
		if (!this.other_players[key]) {
			console.log("Found a new player", value);
			this.other_players[key] = new Other_Player(this, value);
		}
	},
	create_background: function() {
		this.background = Game_Client.game.add.tileSprite(0, 0, 1000, 3000, 'background');
		this.space_emitter = Game_Client.game.add.emitter(500, 0, 10);
		this.space_emitter.makeParticles(['star', 'ship']);
		this.space_emitter.setXSpeed(-300, 300);
		this.space_emitter.setYSpeed(300,500);
		this.space_emitter.setRotation(-100, 100);
		this.space_emitter.start(false, 10000, 1000);
	},
	create_main_player: function() {
		this.player = new Player(this);
	},
	create_platforms: function() {
		this.platforms = this.add.physicsGroup();
		var x_min = 300;
		var x_max = 700;
		this.platforms.create(300, 2950, 'platform');
		this.platforms.create(375, 2850, 'platform');
		this.platforms.create(450, 2750, 'platform_ice');
		this.platforms.create(525, 2650, 'platform');
		this.platforms.create(600, 2550, 'platform');
		this.platforms.create(525, 2450, 'platform');
		this.platforms.create(450, 2350, 'platform');
		this.platforms.create(375, 2250, 'platform');
		this.platforms.create(300, 2150, 'platform_ice');
		this.platforms.create(375, 2050, 'platform');
		this.platforms.create(450, 1950, 'platform');
		this.platforms.create(525, 1850, 'platform');
		this.platforms.create(600, 1750, 'platform');
		this.platforms.create(525, 1650, 'platform');
		this.platforms.create(450, 1550, 'platform_ice');
		this.platforms.create(375, 1450, 'platform');
		this.platforms.create(300, 1350, 'platform');
		this.platforms.create(375, 1250, 'platform');
		this.platforms.create(450, 1150, 'platform');
		this.platforms.create(525, 1050, 'platform');
		this.platforms.create(600, 950, 'platform');
		this.platforms.create(525, 850, 'platform_ice');
		this.platforms.create(450, 750, 'platform');
		this.platforms.create(375, 650, 'platform');
		this.platforms.create(300, 550, 'platform');
		this.platforms.create(375, 450, 'platform');
		this.platforms.create(450, 350, 'platform_ice');
		this.platforms.create(525, 250, 'platform');
		this.platforms.create(600, 150, 'platform');
		this.platforms.create(525, 50, 'platform');
		this.platforms.setAll('body.allowGravity', false);
		this.platforms.setAll('body.immovable', true);
		// this.platforms.setAll('body.velocity.x', 100);
	},
	set_environment: function() {
		this.platforms = [];
		this.other_players = {};
		// Game_Client.game.physics.arcade.gravity.y = 00;
		Game_Client.game.world.setBounds(0, 0, 1000, 3000);
	},
	set_physics: function() {
		var self = this;
		this.player.set_physics();
	},
	update_platforms: function() {
		this.platforms.forEach(this.warp_platform, this);
	},
	update_other_players: function() {
		this.check_new_players();
		this.check_delete_players();
		_.each(this.other_players, _.bind(this.update_other_player,this));
	},
	update_other_player: function(value, key) {
		this.other_players[key].update();
	},
	warp_platform: function (platform) {
		if (!platform.tween) {
			var new_x = Game_Client.game.rnd.integerInRange(300, 600);
			platform.tween = Game_Client.game.add.tween(platform).to({x:new_x}, 5000,  null, true);
			platform.tween.onComplete.add(function() {delete platform.tween}, this);
		}
	},
};