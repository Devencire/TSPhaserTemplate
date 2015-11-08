import Community = require('./Community')
import Village = require('./Village')
import Road = require('./Road')
import Util = require('./Util')

class Town extends Community {
  static townCount = 0;

  static minVillageDistance = 80;
  static villageRadius = 140;
  static minTownDistance = 240;

  townNumber: number;
  villages: Array<Village> = [];

  constructor(game, x, y) {
    super(game, x, y, 'town');

    this.townNumber = Town.townCount;
    Town.townCount++
  }
}

export = Town
