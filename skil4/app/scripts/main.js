/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));

    $('.Start').click(function() {
        $('.Start').removeClass('is-visible');
        game.start();
    });
});