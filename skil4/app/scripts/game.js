window.Game = (function() {
    'use strict';

    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */

    var controls = window.Controls;
    var Game = function(el) {


        //var start = false;

        /* startEl
             .addClass('is-visible')
             .find('.Start');
         if (controls.keys.space) {
             startEl.removeClass('is-visible');
             this.start();
         }*/
        this.el = el;
        this.player = new window.Player(this.el.find('.Player'), this);
        this.pipe1 = new window.Pipes(this.el.find('.Pipes1'), this, 1);
        this.pipe2 = new window.Pipes(this.el.find('.Pipes2'), this, 2);
        this.ground = new window.Ground(this.el.find('.Ground'), this);
        this.bubble1 = new window.Bubbles(this.el.find('.Bubble1'), this);
        this.bubble2 = new window.Bubbles(this.el.find('.Bubble2'), this);
        this.starfish = new window.Starfish(this.el.find('.Starfish'), this)
            //this.pipe3 = new window.Pipes(this.el.find('.Pipes3'), this, 2);

        // var startEl = this.el.find('.Start');



        this.isPlaying = false;
        this.score = 0;

        var fontSize = Math.min(
            window.innerWidth / 50,
            window.innerHeight / 75
            //window.innerWidth / 102.4,
            //window.innerHeight / 57.6
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
        if (controls.keys.space) {
            this.isPlaying = true;
        }

        // Calculate how long since last frame in seconds.
        var now = +new Date() / 1000,
            delta = now - this.lastFrame;
        this.lastFrame = now;

        // Update game entities.
        this.player.onFrame(delta, this.isPlaying);
        this.pipe1.onFrame(delta, this.isPlaying);
        this.pipe2.onFrame(delta, this.isPlaying);
        this.ground.onFrame(delta, this.isPlaying);
        this.bubble1.onFrame(delta, this.isPlaying);
        this.bubble2.onFrame(delta, this.isPlaying);
        this.starfish.onFrame(delta, this.isPlaying);


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
        this.pipe1.reset();
        this.pipe2.reset();
        this.bubble1.reset();
        this.bubble2.reset();
        this.starfish.reset();
        this.isPlaying = false;
    };

    /**
     * Signals that the game is over.
     */
    Game.prototype.gameover = function() {
        this.isPlaying = false;

        // Should be refactored into a Scoreboard class.
        var that = this;
        var scoreboardEl = this.el.find('.Scoreboard');
        document.getElementById('ScoreBoardScore').innerText = this.score;

        scoreboardEl
            .addClass('is-visible')
            .find('.Scoreboard-restart')
            .one('click', function() {
                scoreboardEl.removeClass('is-visible');
                that.start();
            });
        this.score = 0;
        document.getElementById('Score').innerText = this.score;

    };

    /**
     * Some shared constants.
     */
    // Game.prototype.WORLD_WIDTH = 102.4;
    //Game.prototype.WORLD_HEIGHT = 57.6;
    Game.prototype.WORLD_WIDTH = 40;
    Game.prototype.WORLD_HEIGHT = 70;

    return Game;
})();