import Community = require("Community")

class TravelGroup extends Phaser.Sprite {

  origin: Community;
  destination: Community;
  speed: number;
  progress: number;
  moving: boolean;

  constructor(game: Phaser.Game, origin: Community, speed: number, destination?: Community) {
    super(game, origin.x, origin.y, 'person')
    this.anchor.setTo(0.5);

    this.origin = origin;
    this.speed = speed;
    if (destination) {
      this.setDestination(destination);
    } else {
      this.setDestination(origin);
    }
  }

  atDestination(): boolean {
    return this.origin == this.destination;
  }

  setDestination(destination: Community) {
    this.destination = destination;
    this.moving = true;
    if (destination == this.origin) {
      this.progress = 1;
    } else {
      this.progress = 0;
    }
  }

  distanceOfJourney(): number {
    return this.origin.position.distance(this.destination.position);
  }

  arriveAtDestination() {
    this.progress = 1;
    this.origin = this.destination;
    this.moving = false;
  }

  update() {
    super.update();
    if (this.moving) {
      this.progress += this.speed / this.distanceOfJourney();
      if (this.progress >= 1) {
        this.arriveAtDestination();
      }
      this.position = Phaser.Point.interpolate(this.origin.position, this.destination.position, this.progress);
    }
  }

}

export = TravelGroup;
