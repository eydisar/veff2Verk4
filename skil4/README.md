# HTML5 CSS-based Game

This game project has the following:

* All positions and sizes defined using a 10px em. This means that the game could be scaled up and down by changing the base font-size. This is one way to make the graphics responsive.
* A simple game loop which calculates delta and can be started and stopped.
* A player entity which can be moved around the canvas using the arrow keys.
* A "Game Over" screen when player is moved outside bounds, where the game can be restarted.

## Setup

```
npm install
bower install
grunt server
```

## Additions

Sound effects (royalty free) were added, along with Selma Björnsdóttir's classic song "All out of luck", as background music.
You can mute either the song or the sound effects, or both.
The player can keep track of his/her high score as well as his/her current score.
The game was tested in Firefox and Chrome.
