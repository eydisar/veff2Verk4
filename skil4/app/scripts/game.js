window.Game = (function() {
    'use strict';

    /**
     * Main game class.
     * @param {Element} el jQuery element containing the game.
     * @constructor
     */

    var controls = window.Controls;
    var Game = function(el) {

        this.song = new Audio('../audio/bensound-extremeaction.mp3');
        this.song.play();
        this.swoosh = new Audio('../audio/flyby-Conor-1500306612.mp3');

        this.highScore = 0;

        this.el = el;
        this.player = new window.Player(this.el.find('.Player'), this);
        this.pipe1 = new window.Pipes(this.el.find('.Pipes1'), this, 1);
        this.pipe2 = new window.Pipes(this.el.find('.Pipes2'), this, 2);
        this.ground = new window.Ground(this.el.find('.Ground'), this);
        this.bubble1 = new window.Bubbles(this.el.find('.Bubble1'), this);
        this.bubble2 = new window.Bubbles(this.el.find('.Bubble2'), this);
        this.starfish = new window.Starfish(this.el.find('.Starfish'), this)

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
            $('.Player').css('background', 'url(../images/SealSwim.png)');
            $('.Player').css('background-size', '10em');
        }
        else{
             $('.Player').css('background', 'url(../images/SealSink.png)');
             $('.Player').css('background-size', '11.6em');
        }

        if (this.song.muted === false) {
            this.swoosh.play();
        }
        $('#Player').addClass('rotated');
        
        var song = this.song;

        $('#mute').click(function() {
            if (song.muted === true) {
                song.muted = false;
                $('#mute').css('background-image', 'url(https://maxcdn.icons8.com/Android_L/PNG/512/Media_Controls/medium_volume-512.png)');
            } else {
                song.muted = true;
                $('#mute').css('background-image', 'url(http://www.iconarchive.com/download/i91178/icons8/windows-8/Media-Controls-Mute.ico)');
            }
        });

        // Calculate how long since last frame in seconds.
        var now = +new Date() / 1000,
            delta = now - this.lastFrame;
        this.lastFrame = now;

        // Update game entities.
        this.player.onFrame(delta);
        this.pipe1.onFrame(delta);
        this.pipe2.onFrame(delta);
        this.ground.onFrame(delta);
        this.bubble1.onFrame(delta);
        this.bubble2.onFrame(delta);
        this.starfish.onFrame(delta);

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
        if (this.song.muted === false) {
            var audio = new Audio('../audio/9_mm_gunshot-mike-koenig-123.mp3');
            audio.play();
        }
        this.isPlaying = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById('HighScore').innerText = this.highScore;
        }

        $('.Player').css('background', 'url(../images/SealFall.png)');
        $('.Player').css('background-size', '10em');

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