window.Ground = (function() {
    'use strict';

    var SPEED = 20;

    var Ground = function(el, game) {
        this.el = el;
        this.game = game;
        this.player = game.player;
        this.pos = { x: 0, y: 0 };
    };

    Ground.prototype.onFrame = function(delta, isPlaying) {

        if (isPlaying) {
            this.pos.x -= delta * SPEED;
        }


        if (this.pos.x <= -15) {
            this.pos.x = 0;
        }

        this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
    };

    return Ground;

})();