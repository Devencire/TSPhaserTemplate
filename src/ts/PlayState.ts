import Communities = require('./Communities')
import Player = require('./Player')

class PlayState extends Phaser.State {
  static instance: PlayState;

  static worldSize = { x: 3000, y: 3000 };

  player: Player;
  communities: Communities;

  constructor() {
    super()
  }

  preload() {
    console.log("Preloading...");

    this.game.load.image('village', 'assets/village.png');
    this.game.load.image('town', 'assets/town.png');
    this.game.load.image('person', 'assets/person.png');
  }

  create() {
    console.log("Initialising...");

    PlayState.instance = this;
    console.log(PlayState, PlayState.instance);

    this.game.stage.backgroundColor = '#ffffff';
    this.game.world.setBounds(0, 0, PlayState.worldSize.x, PlayState.worldSize.y);

    this.communities = new Communities(this.game);
    this.game.add.existing(this.communities);

    var startingTown = this.communities.towns.getFirstExists(true);
    this.player = new Player(this.game, startingTown, 1);
    this.game.add.existing(this.player);
    this.camera.follow(this.player);
    this.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    this.camera.focusOn(this.player);

  }

  update() {

    this.camera.x += this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ? -5
      : this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ? 5 : 0;
    this.camera.y += this.game.input.keyboard.isDown(Phaser.Keyboard.UP) ? -5
      : this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ? 5 : 0;

    this.moveCameraByPointer(this.game.input.mousePointer)

  }

  private lastPointerPosition: Phaser.Point;

  private moveCameraByPointer(pointer: Phaser.Pointer) {
    if (!pointer.timeDown) return;
    if (pointer.isDown && !pointer.targetObject) {
      if (this.lastPointerPosition) {
        this.game.camera.x += this.lastPointerPosition.x - pointer.position.x
        this.game.camera.y += this.lastPointerPosition.y - pointer.position.y
      }
      this.lastPointerPosition = pointer.position.clone();
    } else {
      this.lastPointerPosition = null;
    }
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32)
  }
}

export = PlayState
