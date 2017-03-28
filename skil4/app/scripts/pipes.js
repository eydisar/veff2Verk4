window.Pipes = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 640x420px canvas.
    var SPEED = 20; // * 10 pixels per second
    var WIDTH = 15;
    var INITIAL_POSITION_X = 50;
    var throughPipe = false;
    // var outsideBounds = false;
    var barrier = 40;

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
        this.pos.y = Math.random() * (-20 - (-40)) + (-40);
    };

    Pipes.prototype.onFrame = function(delta) {

        if (this.game.isPlaying) {
            this.pos.x -= delta * SPEED;
        }
        var negativeWidth = WIDTH - WIDTH * 2;
        if (this.pos.x < negativeWidth) {
            this.pos.x = INITIAL_POSITION_X;

            var rand = Math.random() * (-20 - (-40)) + (-40);
            this.pos.y = rand;
        }

        this.checkCollisionWithPlayer();

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    Pipes.prototype.checkCollisionWithPlayer = function() {
        if (((this.player.pos.x + 5) > this.pos.x) &&
            (this.player.pos.x < (this.pos.x + 10))) {
            if (((this.player.pos.y) > (this.pos.y + barrier + 28)) ||
                (this.player.pos.y < (this.pos.y + barrier + 10))) {
                throughPipe = true;
                return this.game.gameover();
            } else {
                throughPipe = false;
            }

            /*  if (((this.player.pos.y + 5) > (this.pos.y + barrier + 22.5)) ||
                  (this.player.pos.y < (this.pos.y + barrier + 10))) {
                  throughPipe = true;
                  return this.game.gameover();
              } else {
                  throughPipe = false;
              }*/
        }
        //console.log(this.pos.x + 10);
        //console.log('player: ' + this.player.pos.x);
        if (((this.player.pos.x < (this.pos.x + 11) && (this.player.pos.x > (this.pos.x + 10)))) && !throughPipe) {
            this.game.score++;
            console.log('score ' + this.game.score);
            throughPipe = true;
            document.getElementById('Score').innerText = this.game.score;
        }
    };

    return Pipes;

})();