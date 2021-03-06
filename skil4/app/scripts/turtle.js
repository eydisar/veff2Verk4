window.Turtle = (function() {
    'use strict';

    var INITIAL_POSITION_X = 60;
    var SPEED = 5;

    var Turtle = function(el, game) {
        this.el = el;
        this.game = game;
        this.player = game.player;
        this.pos = { x: 0, y: 0 };
    };

    Turtle.prototype.reset = function() {
        this.pos.x = INITIAL_POSITION_X;
        this.pos.y = Math.random() * (20 - (-30)) + (-30);
    };



    Turtle.prototype.onFrame = function(delta) {

        if (this.game.isPlaying) {
            //this.pos.y -= delta * SPEED;
            this.pos.x -= delta * SPEED;
        }

        if (this.pos.x <= -10) {
            this.pos.x = INITIAL_POSITION_X;

            var rand = Math.random() * (20 - (-30)) + (-30);
            this.pos.y = rand;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Turtle;

})();