import TravelGroup = require("TravelGroup")
import Community = require("Community")

class Player extends TravelGroup {

  constructor(game: Phaser.Game, origin: Community, speed: number, destination?: Community) {
    super(game, origin, speed, destination)
    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onClicked())
  }

  attemptTravelTo(community: Community) {
    if (this.atDestination() && this.origin.hasRoadTo(community)) {
      this.setDestination(community);
    } else if (community == this.origin) {
      var newProgress = 1 - this.progress;
      this.origin = this.destination;
      this.setDestination(community);
      this.progress = newProgress;
    } else if (community == this.destination && !this.moving) {
      this.moving = true;
    }
  }

  onClicked() {
    console.log("Ack click.");
    if (!this.atDestination()) {
      this.moving = !this.moving;
    }
  }

}

export = Player;
