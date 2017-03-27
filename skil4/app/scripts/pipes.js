window.Pipes = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 640x420px canvas.
    var SPEED = 20; // * 10 pixels per second
    var WIDTH = 16;
    var INITIAL_POSITION_X = 50;
    var INITIAL_POSITION_Y = -30;
    var throughPipe = false;
    // var outsideBounds = false;
    var barrier = 36;

    var Pipes = function(el, game, id) {
        this.el = el;
        this.game = game;
        this.id = id;
        this.player = game.player;
        this.pos = { x: 0, y: 0 };
    };

    /*
     * Resets the state of the Pipe for a new game.
     */
    Pipes.prototype.reset = function() {
        throughPipe = false;
        if (this.id === 1) {
            this.pos.x = INITIAL_POSITION_X;
        } else {
            this.pos.x = INITIAL_POSITION_X + 30;
        }
        this.pos.y = INITIAL_POSITION_Y;
    };

    Pipes.prototype.onFrame = function(delta, isPlaying) {

        if (isPlaying) {
            this.pos.x -= delta * SPEED;
        }
        var negativeWidth = WIDTH - WIDTH * 2;
        if (this.pos.x < negativeWidth) {
            this.pos.x = INITIAL_POSITION_X;

            var randStartArr = [-25, -20, -15, -10, -5, 0];
            var rand = randStartArr[Math.floor(Math.random() * randStartArr.length)];
            this.pos.y = rand;
        }

        this.checkCollisionWithPlayer();

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Pipes.prototype.checkCollisionWithPlayer = function() {
        if (((this.player.pos.x + 5) > this.pos.x) && (this.player.pos.x < (this.pos.x + WIDTH))) {

            if ((this.player.pos.y < (this.pos.y + barrier)) || ((this.player.pos.y + 5) > (this.pos.y + barrier + 20))) {
                return this.game.gameover();
            }
        }
        if (((this.pos.x + WIDTH / 2) < this.player.pos.x) && !throughPipe) {
            this.game.score++;
            throughPipe = true;
            document.getElementById('Score').innerText = this.game.score;
        }
    };

    return Pipes;

})();