window.Bubbles = (function() {
    'use strict';

    //var INITIAL_POSITION_X = 10;
    var INITIAL_POSITION_Y = 10;
    var SPEED = 20;

    var Bubbles = function(el, game) {
        this.el = el;
        this.game = game;
        this.player = game.player;
        this.pos = { x: 0, y: 0 };
    };

    Bubbles.prototype.onFrame = function(delta, isPlaying) {

        if (isPlaying) {
            this.pos.y -= delta * SPEED;
            this.pos.x -= delta * SPEED;
        }

        if (this.pos.y <= -100) {
            this.pos.y = INITIAL_POSITION_Y;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };



    Bubbles.prototype.onFrame = function(delta, isPlaying) {

        if (isPlaying) {
            this.pos.y -= delta * SPEED;
            this.pos.x -= delta * SPEED;
        }

        if (this.pos.y <= -100) {
            this.pos.y = INITIAL_POSITION_Y;

            var randStartArr = [25, 20, 15, 10, 5, 30];
            var rand = randStartArr[Math.floor(Math.random() * randStartArr.length)];
            this.pos.x = rand;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Bubbles;

})();