class Util {
  static distanceFromPointToLine(point: Phaser.Point, line: Phaser.Line) {
    var lineDistance = line.start.distance(line.end);
    if (lineDistance == 0) {
      return point.distance(line.start);
    }
    var t = ((point.x - line.start.x) * (line.end.x - line.start.x)
      + (point.y - line.start.y) * (line.end.y - line.start.y)) / Math.pow(lineDistance, 2)
    if (t < 0) {
      return point.distance(line.start);
    } else if (t > 1) {
      return point.distance(line.end);
    } else {
      return point.distance(new Phaser.Point(
        line.start.x + t * (line.end.x - line.start.x),
        line.start.y + t * (line.end.y - line.start.y)
        ))
    }
  };
}

export = Util;
