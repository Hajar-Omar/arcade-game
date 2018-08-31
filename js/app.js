'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Enemies our player must avoid
var Enemy = function Enemy(y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -120;
  this.y = y;
  this.speed = speed;

  this.width = 101;
  this.height = 171;

  this.top = this.y;
  this.left = this.x;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 530) {
    this.x = 0;
  }
  this.left = this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.update(2);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);

    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 380;

    this.width = 101;
    this.height = 171;

    this.top = this.y;
    this.left = this.x;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      var topGab = 0;
      for (var enemy = 0; enemy < allEnemies.length; enemy++) {
        switch (allEnemies[enemy].top) {
          case 230:
            topGab = allEnemies[enemy].top - 16;
            break;
          case 145:
            topGab = allEnemies[enemy].top - 14;
            break;
          case 60:
            topGab = allEnemies[enemy].top - 12;
            break;
        }
        if (player.top == topGab && allEnemies[enemy].left >= player.left && allEnemies[enemy].left <= player.left + this.width) {
          this.reset();
          // debugger;
        } else {
          this.render();
        }
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.x = 202;
      this.y = 380;
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: 'handleInput',
    value: function handleInput(arrow) {
      switch (arrow) {
        case 'up':
          if (this.y > 48) {
            this.y -= 83;
            this.top = this.y;
            this.left = this.x;
          } else {
            this.reset();
          }
          break;
        case 'down':
          if (this.y < 380) {
            this.y += 83;
            this.top = this.y;
            this.left = this.x;
          }
          break;
        case 'left':
          if (this.x >= 101) {
            this.x -= 101;
            this.top = this.y;
            this.left = this.x;
          }
          break;
        case 'right':
          if (this.x < 404) {
            this.x += 101;
            this.top = this.y;
            this.left = this.x;
          }
          break;
        default:
          break;
      }
    }
  }]);

  return Player;
}();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [new Enemy(60, 1), new Enemy(145, 4), new Enemy(230, 2), new Enemy(145, 3)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});