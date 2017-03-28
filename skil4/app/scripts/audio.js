window.Audio = (function() {
    'use strict';

    // All these constants are in em's, multiply by 10 pixels
    // for 640x420px canvas.
    /* var SPEED = 20; // * 10 pixels per second
     var WIDTH = 15;
     var INITIAL_POSITION_X = 50;
     var INITIAL_POSITION_Y = -30;
     var throughPipe = false;
     // var outsideBounds = false;
     var barrier = 40;*/

    var Audio = function(el, game) {
        this.el = el;
        this.game = game;
        //  this.player = game.player;
        // this.pos = { x: 0, y: 0 };
    };

    /*
     * Resets the state of the Pipe for a new game.
     */
    Audio.prototype.reset = function() {
        /* throughPipe = false;
         if (this.id === 1) {
             this.pos.x = INITIAL_POSITION_X;
         } else {
             this.pos.x = INITIAL_POSITION_X + 30;
         }
         this.pos.y = INITIAL_POSITION_Y;*/
    };

    Audio.prototype.onFrame = function(delta) {

        /* if (this.game.isPlaying) {
             this.pos.x -= delta * SPEED;
         }
         var negativeWidth = WIDTH - WIDTH * 2;
         if (this.pos.x < negativeWidth) {
             this.pos.x = INITIAL_POSITION_X;

             var randStartArr = [-40, -35, -30, -25, -20];
             var rand = randStartArr[Math.floor(Math.random() * randStartArr.length)];
             this.pos.y = rand;
         }

         this.checkCollisionWithPlayer();*/

        // Update UI
        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Audio;

})();