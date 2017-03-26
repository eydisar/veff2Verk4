window.Game = (function() {
    'use strict';

    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */
    var Game = function(el) {
        this.el = el;
        this.player = new window.Player(this.el.find('.Player'), this);
        this.pipe1 = this.el.find('.Pipe1');
        this.pipe2 = this.el.find('.Pipe2');

        var pipe1 = document.getElementById('Collider1');
        var pipe1Pos = pipe1.getBoundingClientRect();

        var pipe2 = document.getElementById('Collider2');
        var pipe2Pos = pipe2.getBoundingClientRect();

        this.pipe1.css('transform', 'translateZ(0) translate(' + pipe1Pos.left + 'em, ' + pipe1Pos.right + 'em)');
        this.pipe1.css('transform', 'translateZ(0) translate(' + pipe2Pos.left + 'em, ' + pipe2Pos.right + 'em)');

        this.isPlaying = false;

        var fontSize = Math.min(
            window.innerWidth / 102.4,
            window.innerHeight / 57.6
        );
        el.css('fontSize', fontSize + 'px');

        // Cache a bound onFrame since we need it each frame.
        this.onFrame = this.onFrame.bind(this);
    };

    /**
     * Runs every frame. Calculates a delta and allows each game
     * entity to update itself.
     */
    Game.prototype.onFrame = function() {
        // Check if the game loop should stop.
        if (!this.isPlaying) {
            return;
        }

        // Calculate how long since last frame in seconds.
        var now = +new Date() / 1000,
            delta = now - this.lastFrame;
        this.lastFrame = now;

        // Update game entities.
        this.player.onFrame(delta);
        // this.pipe1.onFrame(delta);
        // this.pipe2.onFrame(delta);

        // Request next frame.
        window.requestAnimationFrame(this.onFrame);
    };

    /**
     * Starts a new game.
     */
    Game.prototype.start = function() {
        this.reset();

        // Restart the onFrame loop
        this.lastFrame = +new Date() / 1000;
        window.requestAnimationFrame(this.onFrame);
        this.isPlaying = true;
    };

    /**
     * Resets the state of the game so a new game can be started.
     */
    Game.prototype.reset = function() {
        this.player.reset();
        // this.pipe1.reset();
        // this.pipe2.reset();
    };

    /**
     * Signals that the game is over.
     */
    Game.prototype.gameover = function(score) {
        this.isPlaying = false;
        document.getElementById('score').innerText = score;

        // Should be refactored into a Scoreboard class.
        var that = this;
        var scoreboardEl = this.el.find('.Scoreboard');
        scoreboardEl
            .addClass('is-visible')
            .find('.Scoreboard-restart')
            .one('click', function() {
                scoreboardEl.removeClass('is-visible');
                that.start();
            });
    };

    /**
     * Some shared constants.
     */
    Game.prototype.WORLD_WIDTH = 102.4;
    Game.prototype.WORLD_HEIGHT = 57.6;

    return Game;
})();