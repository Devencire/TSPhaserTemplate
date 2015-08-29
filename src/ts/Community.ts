import Road = require("Road");
import PlayState = require("PlayState");

class Community extends Phaser.Sprite {

  roads: Array<Road> = [];

  constructor(game: Phaser.Game, x: number, y: number, graphic: string) {
    super(game, x, y, graphic)
    this.anchor.setTo(0.5);

    this.inputEnabled = true;
    this.events.onInputDown.add(() => this.onClicked())
  }

  hasRoadTo(community) {
    console.log(this, community, this.roads);
    var hasRoad = false;
    this.roads.forEach((road) => {
      console.log(road.goesTo(community));
      hasRoad = hasRoad || road.goesTo(community);
    });
    console.log(hasRoad);
    return hasRoad;
  }

  private onClicked() {
    console.log("A click totally happened", this);

    //this is when I have to wonder why I'm using TypeScript at all
    var playState = <PlayState> (this.game.state.getCurrentState())
    playState.player.attemptTravelTo(this);
  }

}

export = Community;
