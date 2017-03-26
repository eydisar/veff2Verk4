window.Player = (function() {
    'use strict';

    var playing = false;
    var score = 0;

    var Controls = window.Controls;

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    var SPEED = 30; // * 10 pixels per second
    var WIDTH = 5;
    var HEIGHT = 5;
    var INITIAL_POSITION_X = 30;
    var INITIAL_POSITION_Y = 25;

    var Player = function(el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: 0, y: 0 };
    };

    /**
     * Resets the state of the player for a new game.
     */
    Player.prototype.reset = function() {
        this.pos.x = INITIAL_POSITION_X;
        this.pos.y = INITIAL_POSITION_Y;
    };

    Player.prototype.onFrame = function(delta) {
        /* if (Controls.keys.right) {
             this.pos.x += delta * SPEED;
         }
         if (Controls.keys.left) {
             this.pos.x -= delta * SPEED;
         }
         if (Controls.keys.down) {
             this.pos.y += delta * SPEED;
         }*/

        if (Controls.keys.space) {
            playing = true;
            this.pos.y -= delta * SPEED;
        } else if (playing === true) {
            this.pos.y += delta * 10;
        }

        this.checkCollisionWithBounds();

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Player.prototype.checkCollisionWithBounds = function() {

        var pipe1 = document.getElementById('Collider1');
        var pipe1Pos = pipe1.getBoundingClientRect();
        var pipe1X = pipe1Pos.left;
        var pipe1Y = pipe1Pos.top;

        var pipe2 = document.getElementById('Collider2');
        var pipe2Pos = pipe2.getBoundingClientRect();
        var pipe2X = pipe2Pos.left;
        var pipe2Y = pipe2Pos.top;

        var playerElement = document.getElementById('Player');
        var playerPosition = playerElement.getBoundingClientRect();
        var playerX = playerPosition.left;
        var playerY = playerPosition.top;

        if (this.pos.x < 0 ||
            this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
            this.pos.y + HEIGHT > this.game.WORLD_HEIGHT ||
            ((pipe1X < playerX + 10 && pipe1X > playerX - 10) &&
                pipe1Y < playerY) ||
            ((pipe2X < playerX + 10 && pipe2X > playerX - 10) &&
                pipe2Y > playerY)
        ) {

            playing = false;
            score = 0;
            return this.game.gameover();
        } else if ((pipe1X < playerX + 2 && pipe1X > playerX - 2) &&
            pipe1Y > playerY &&
            pipe2Y < playerY) {
            score += 1;
            console.log('score: ' + score);
        }
    };

    return Player;

})();