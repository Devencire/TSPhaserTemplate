import PlayState = require('PlayState')
import Community = require('Community')
import Village = require('Village')
import Town = require('Town')
import Road = require('Road')
import Util = require('Util')

console.log(Util.distanceFromPointToLine(
  new Phaser.Point(400, 400),
  new Phaser.Line(100, 100, 300, 300)
  ))

class Communities extends Phaser.Group {

  static numberOfTowns = 36;

  game: Phaser.Game;

  towns: Phaser.Group;
  villages: Phaser.Group;
  roads: Phaser.Group;

  constructor(game: Phaser.Game) {
    super(game);
    this.game = game;
    this.roads = new Phaser.Group(game, this);
    this.towns = new Phaser.Group(game, this);
    this.villages = new Phaser.Group(game, this);
    this.createTowns();
    this.createRoads();
  }

  private createTowns() {
    for (var i = 0; i < Communities.numberOfTowns; i++) {
      this.createTown();
    }
  }

  private createRoads() {
    this.towns.forEach((town) => this.createRoadsFromTown(town), this)
    this.towns.forEach((town1) => {
      this.towns.forEach((town2) => {
        if (town1.townNumber < town2.townNumber) {
          this.createRoadsBetweenTowns(town1, town2);
        }
      }, this);
    }, this);
  }

  private createRoadsFromTown(town: Town) {
    town.villages.forEach((village) => {
      this.addRoadBetween(town, village)
    }, this);
  }

  private createRoadsBetweenTowns(town1: Town, town2: Town) {
    var betweenLine = new Phaser.Line(town1.x, town1.y, town2.x, town2.y);
    var townOffRoadLimit = betweenLine.length / 2;
    var makeRoad = true;
    this.towns.forEach((otherTown) => {
      var offRoadLength = Util.distanceFromPointToLine(otherTown.position, betweenLine);
      if (otherTown != town1 && otherTown != town2
        && offRoadLength < townOffRoadLimit) {
        makeRoad = false;
      }
    }, this);
    if (!makeRoad) return;

    var villageOffRoadLimit = 150;
    var villages = [];
    this.villages.forEach((village) => {
      var offRoadLength = Util.distanceFromPointToLine(village.position, betweenLine);
      if (offRoadLength < villageOffRoadLimit
        && village.position.distance(town1) < betweenLine.length
        && village.position.distance(town2) < betweenLine.length) {
        villages.push(village)
      }
    }, this);

    if (villages.length > 0) {
      villages.sort((v1, v2) =>
        v1.position.distance(town1) - v2.position.distance(town1));
      villages.push(town2);
      var prevCommunity = town1;
      villages.forEach((village) => {
        if (!prevCommunity.hasRoadTo(village)) {
          this.addRoadBetween(prevCommunity, village);
        }
        prevCommunity = village;
      })
    } else {
      this.addRoadBetween(town1, town2);
    }
  }

  private addRoadBetween(origin: Community, destination: Community) {
    if (origin == destination) {
      throw "What?!"
    }
    if (origin.hasRoadTo(destination)) return;
    var road = new Road(this.game, origin, destination);
    this.roads.add(road);
  }

  private createTown() {
    var i = 0;
    while (i < 100) {
      var pos = new Phaser.Point(
        Town.minTownDistance + Math.random() * (this.game.world.bounds.width - Town.minTownDistance * 2),
        Town.minTownDistance + Math.random() * (this.game.world.bounds.height - Town.minTownDistance * 2)
        );
      if (this.townWouldFitInPos(pos)) {
        break;
      }
      i++;
    }
    var town: Town = new Town(this.game, pos.x, pos.y);
    this.game.add.existing(town);
    this.towns.add(town);
    town.villages.forEach((village) => this.villages.add(village), this)
  }

  private townWouldFitInPos(pos: Phaser.Point) {
    var wouldFit = true;
    this.towns.forEach((town) => {
      wouldFit = wouldFit && town.position.distance(pos) > Town.minTownDistance
    }, this);
    return wouldFit;
  }

  private createTownVillages(town: Town) {
    var villageCount = 2 + Math.floor(Math.random() * 3)
    for (var i = 0; i < villageCount; i++) {
      this.createTownVillage(town)
    }
  }

  private createTownVillage(town: Town) {
    var i = 0;
    while (i < 100) {
      var dirVec = new Phaser.Point(Math.random() * 2 - 1, Math.random() * 2 - 1);
      dirVec.setMagnitude(Town.minVillageDistance + Math.random() * (Town.villageRadius - Town.minVillageDistance))
      var pos = Phaser.Point.add(dirVec, this.position);
      if (this.villageWouldFitInPos(pos)) {
        break;
      }
      i++;
    }
    var village = new Village(this.game, this.x + dirVec.x, this.y + dirVec.y, town);
    town.villages.push(village);
  }

  private villageWouldFitInPos(pos): boolean {
    var wouldFit = true;
    this.villages.forEach((village) => {
      wouldFit = wouldFit
      && village.position.distance(pos) > Village.minVillageDistance
      && Util.distanceFromPointToLine(pos, new Phaser.Line(village.x, village.y, village.town.x, village.town.y)) > Village.minUnrelatedRoadDistance;
    }, this);
    return wouldFit;
  }

}

export = Communities
