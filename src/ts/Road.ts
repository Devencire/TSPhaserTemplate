import Community = require("./Community");

class Road extends Phaser.Sprite {

  start: Community;
  end: Community;

  static width = 4;

  constructor(game: Phaser.Game, start: Community, end: Community) {
    this.start = start;
    this.end = end;

    var pos = new Phaser.Point(
      Math.min(start.x, end.x) - Road.width,
      Math.min(start.y, end.y) - Road.width
      )
    var diff = Phaser.Point.subtract(start.position, end.position);
    var bmd = game.add.bitmapData(
      Math.abs(diff.x) + Road.width * 2,
      Math.abs(diff.y) + Road.width * 2
      )

    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = Road.width;
    bmd.ctx.strokeStyle = 'black';
    var lStart = Phaser.Point.subtract(start.position, pos);
    bmd.ctx.moveTo(lStart.x, lStart.y);
    var lEnd = Phaser.Point.subtract(end.position, pos);
    bmd.ctx.lineTo(lEnd.x, lEnd.y);
    bmd.ctx.stroke();
    bmd.ctx.closePath();

    super(game, pos.x, pos.y, bmd)

    start.roads.push(this);
    end.roads.push(this);
  }

  goesTo(community: Community) {
    return (community == this.start || community == this.end);
  }

}

export = Road;
