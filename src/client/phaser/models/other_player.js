var Other_Player = function(state, user) {
	this.state = state;
	this.user = user;
	// Spawn outside of bounds
	this.sprite = Game_Client.game.add.sprite(-10, 3000, 'other_dude');
	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('idle', [4], 20, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
};

Other_Player.prototype.remove_tween =  function() {
	delete this.tween;
};

Other_Player.prototype.update = function() {
	// Don't make updates to players that dont exist
	if (Client.known_users[this.user.id] && Client.known_users[this.user.id].position && !this.tween) {
		var new_x = Client.known_users[this.user.id].position.x;
		var new_y = Client.known_users[this.user.id].position.y;
		this.tween = Game_Client.game.add.tween(this.sprite).to({x:new_x, y:new_y}, 150,  Phaser.Easing.Bounce.Out, true);
		this.tween.onComplete.add(this.remove_tween, this);
	}
	if (Client.known_users[this.user.id] && Client.known_users[this.user.id].facing) {
		if (this.facing == 'right') {
			this.sprite.animations.play('right');
		}
		else if (this.facing == 'left') {
				this.sprite.animations.play('left');
		}
		else {
			this.sprite.animations.play('idle');
		}
	}
};