window.Bubbles = (function() {
    'use strict';

    //var INITIAL_POSITION_X = 10;

    //var INITIAL_POSITION_Y = 20;
    var SPEED = 20;

    var Bubbles = function(el, game) {
        this.el = el;
        this.game = game;
        this.player = game.player;
        this.pos = { x: 0, y: 20 };
    };

    Bubbles.prototype.reset = function() {
        this.pos.x = Math.random() * (60 - (-30)) + (-30);
        this.pos.y = Math.random() * (30 - (15)) + (15);
    };


    Bubbles.prototype.onFrame = function(delta) {

        if (this.game.isPlaying) {
            this.pos.y -= delta * SPEED;
            this.pos.x -= delta * SPEED;
        }

        if (this.pos.y <= -80) {
            this.pos.y = Math.random() * (30 - (15)) + (15);

            this.pos.x = Math.random() * (60 - (-30)) + (-30);
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };


    return Bubbles;

})();