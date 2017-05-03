import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class Splash extends Phaser.State {
  constructor () {
    super();
    this.text = '';
    this.x = 32;
    this.y = 80;
    this.music = null;
  }

  init () {
    this.titleText = this.make.text(this.world.centerX, 100, 'You Did It!', {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });

    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('brick', 'assets/splash/brick.png');
    this.load.image('map', 'assets/Menu/map.png');
    this.load.spritesheet('dude', 'assets/splash/sprite.png', 32, 32);
    this.load.image('key', 'assets/Menu/key5.png');
    this.load.image('background', 'assets/breakout/starsBG.png');
    this.load.audio('getKey', 'assets/Menu/getKey.wav');
    this.load.audio('music', 'assets/audio/fragile.mp3');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    this.bs = this.add.text(this.world.centerX, 150, 'You Rocked Brickin.  High Score: ' + window.game.breakoutHighScore,
    { fontSize: '20px', fill: 'gold', align: 'center' });
    this.bs.anchor.set(0.5);


    this.getKeySound = this.add.audio('getKey');
    this.music = this.add.audio('music');
    this.music.play();

    this.key = this.add.sprite(375, 200, 'key');
    this.physics.arcade.enable(this.key);
    this.key.body.immovable = true;

    this.player = this.add.sprite(250, 200, 'dude');
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

    if (this.physics.arcade.collide(this.player, this.key)) {
      this.goToHome();
      this.getKeySound.play();
      this.music.stop();
    }
  }

  goToGame () {
    this.state.start('Breakout');
    this.music.stop();
  }
  goToHome () {
    this.state.start('Splash');
    // this.resetGame();
  }
}
