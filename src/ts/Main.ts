/// <reference path="../../lib/def/phaser.d.ts" />

import PlayState = require('./PlayState')

class Main {
  game: Phaser.Game;

  run() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');

    this.game.state.add("PlayState", PlayState, false);
    this.game.state.start("PlayState", true, true);
  }
}

export = Main;
