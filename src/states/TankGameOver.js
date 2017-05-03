import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class extends Phaser.State {
  constructor () {
    super();
    this.text = '';
    this.bird = null;
    this.flappyButton = null;
    this.x = 32;
    this.y = 80;
    this.music = null;
  }

  init () {
    this.titleText = this.make.text(this.world.centerX, 200, 'Game Over. \n Play Again?', {
      font: 'bold 72pt TheMinion', fill: 'red', align: 'center'
    });
    this.titleText2 = this.make.text(this.world.centerX, 150, 'You need a minimum of 20 points to proceed!', {
      font: 'bold 20pt TheMinion', fill: 'black', align: 'left'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('tank', 'assets/Menu/tank.png');
    this.load.image('map', 'assets/Menu/map.png');
    this.load.spritesheet('dude', 'assets/splash/sprite.png', 32, 32);
    this.load.image('key', 'assets/Menu/key.png');
    this.load.image('background', 'assets/Menu/gameoverwall.jpg');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    this.add.existing(this.titleText2);

    this.music = this.add.audio('mainTitle');
    this.music.play();

    this.tank = this.add.sprite(200, 400, 'tank');
    this.physics.arcade.enable(this.tank);
    this.tank.body.immovable = true;

    this.map = this.add.sprite(500, 400, 'map');
    this.physics.arcade.enable(this.map);
    this.map.body.immovable = true;

    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.world.scale.setTo(1);

    this.player.animations.add('up', [104, 105, 106, 107, 108,
      109, 110, 111, 112], 9, true);
    this.player.animations.add('down', [130, 131, 132, 133, 134, 135, 136, 137, 138], 9, true);
    this.player.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 9, true);
    this.player.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 9, true);



    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  update () {
    if (this.escape.isDown) {
      this.goToHome();
      this.music.stop();
    }

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -150;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 150;
      this.player.animations.play('down');
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToGame();
    }
    if (this.physics.arcade.collide(this.player, this.map)) {
      this.goToHome();
    }
    this.physics.arcade.collide(this.player, this.key);
  }

  goToGame () {
    this.state.start('Tank');
    this.music.stop();
  }
  goToHome () {
    this.state.start('Splash');
    // this.resetGame();
  }
}
