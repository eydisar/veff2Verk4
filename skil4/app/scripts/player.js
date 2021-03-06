window.Player = (function() {
    'use strict';

    var playing = false;
    // var score = 0;

    var Controls = window.Controls;

    // All these constants are in em's, multiply by 10 pixels
    // for 1024x576px canvas.
    var SPEED = 30; // * 10 pixels per second
    var WIDTH = 10;
    var HEIGHT = 5;
    var INITIAL_POSITION_X = 20;
    var INITIAL_POSITION_Y = 25;

    var Player = function(el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: 0, y: 0 };
        this.rotation = 0;
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
                this.pos.y += delta * 13;
            }
        }
        this.checkCollisionWithBounds();

        // Update UI
        this.el.css('transform', 'rotate(' + (this.rotation) + 'deg) translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Player.prototype.checkCollisionWithBounds = function() {

        if (this.pos.x < 0 ||
            this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
            this.pos.y + (HEIGHT + 3) > this.game.WORLD_HEIGHT) {

            playing = false;
            return this.game.gameover();
        }

    };

    return Player;

})();