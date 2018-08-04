// Enemies our player must avoid
var Enemy = function(y = 0, speed = 350, x = -101) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = "images/enemy-bug.png";

	this.x = x;
	this.y = y + 65;
	this.rush = 101;
	this.end = this.rush * 5;
	this.startPos = -this.rush;
	this.speed = speed;
	this.win = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	//tells the enemies to move until off the screen and loop back once they are
	if (this.x < this.end) {
		this.x += this.speed * dt;
	} else {
		//reset to starting position once off screen
		this.x = this.startPos;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor() {
		this.sprite = "images/char-horn-girl.png"; //need to ensure that sprites are loaded into engine.js
		this.strafe = 101;
		this.advance = 83;
		this.startX = this.strafe * 2;
		this.startY = this.advance * 4 + 65;
		this.x = this.startX;
		this.y = this.startY;
		this.victory = false;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	//set player back to starting position
	resetPlayer() {
		this.x = this.startX;
		this.y = this.startY;
	}

	update() {
		//checks if player has collided with enemy, if so, resets player to starting position
		for (let enemy of allEnemies) {
			if (
				this.y === enemy.y &&
				(enemy.x + enemy.rush / 2 > this.x &&
					enemy.x < this.x + this.strafe / 2)
			) {
				this.resetPlayer();
			}
		}

		//checks if player has made it to the end of the board
		if (this.y === -18) {
			this.win = true;
		}
	}

	//controls player movement on the board based on key press. Limits movement to within the board
	handleInput(input) {
		switch (input) {
			case "left":
				//limits movement to leftmost section of the board
				if (this.x > 0) {
					this.x -= this.strafe;
				}
				break;
			case "up":
				//limits movement to uppermost section of the board
				if (this.y > 0) {
					this.y -= this.advance;
				}
				break;
			case "right":
				//limits movement to rightmost section of the board
				if (this.x < this.strafe * 4) {
					this.x += this.strafe;
				}
				break;
			case "down":
				//limits movement to bottom section of the board
				if (this.y < this.advance * 4) {
					this.y += this.advance;
				}
				break;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();
let allEnemies = [];
const enemy1 = new Enemy();
const enemy2 = new Enemy(83, 500);
const enemy3 = new Enemy(166, 200);

allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down"
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
