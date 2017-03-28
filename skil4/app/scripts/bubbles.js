window.Bubbles = (function() {
    'use strict';
    var posArr = [0, 5, 10, 15, 20, 25, 30, 35, 40];
    var INITIAL_POSITION_X = 50;
    var INITIAL_POSITION_Y = -30;
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
            this.pos.y = 0;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };


    return Bubbles;

})();