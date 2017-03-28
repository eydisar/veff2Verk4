window.Player = (function() {
    'use strict';

    var playing = false;
    // var score = 0;

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
        if (this.game.isPlaying) {
            this.el.css('transition', '0s');
            if (Controls.keys.space) {
                playing = true;
                this.pos.y -= delta * SPEED;
            } else if (playing === true) {
                this.pos.y += delta * 10;
            }
        }
        this.checkCollisionWithBounds();

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Player.prototype.checkCollisionWithBounds = function() {

        if (this.pos.x < 0 ||
            this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
            this.pos.y + (HEIGHT + 3) > this.game.WORLD_HEIGHT) {

            playing = false;
            return this.game.gameover();
        }
        /* var playerLocation = document.getElementById('Player');
         var playerPos = playerLocation.getBoundingClientRect();
         var playerX = playerPos.left;
         var playerY = playerPos.top;

         var pipe1up = document.getElementsByClassName('scoreCheck1');
         //var pipe1down = document.getElementsByClassName('scoreCheck2');
         var pipe2up = document.getElementsByClassName('scoreCheck3');
         //var pipe2down = document.getElementsByClassName('scoreCheck4');
         var pipe1UpPos = pipe1up.getBoundingClientRect();
         //var pipe1DownPos = pipe1down.getBoundingClientRect();
         var pipe2UpPos = pipe2up.getBoundingClientRect();
         //var pipe2DownPos = pipe2down.getBoundingClientRect();
         var pipe1upX = pipe1UpPos.left;
         var pipe1upY = pipe1UpPos.top;
         //var pipe1downY = pipe1DownPos.top;
         //var pipe2upX = pipe2UpPos.left;
         var pipe2upY = pipe2UpPos.top;

         //var pipe2X = pipe2Pos.left;
         //var pipe2Y = pipe2Pos.top;

         if ((pipe1upX < playerX + 1.8 && pipe1upX > playerX - 1.8) &&
             pipe1upY > playerY &&
             pipe2upY < playerY) {
             this.game.score += 1;
         }*/
    };

    return Player;

})();