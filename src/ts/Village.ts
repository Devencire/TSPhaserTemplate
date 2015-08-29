import Community = require('Community')
import Town = require('Town')

class Village extends Community {
  static minVillageDistance = 50;
  static minUnrelatedRoadDistance = 60;

  town: Town

  constructor(game: Phaser.Game, x: number, y: number, town: Town) {
    super(game, x, y, 'village');

    this.town = town;
  }
}

export = Village
