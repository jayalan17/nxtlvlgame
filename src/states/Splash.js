import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class Splash extends Phaser.State {
  constructor () {
    super();
    this.x = 32;
    this.y = 80;
  }

  preload () {
    this.load.image('tank', 'assets/splash/tank.png');
    this.load.image('bird', 'assets/splash/bird.png');
    this.load.image('brick', 'assets/splash/brick.png');
    this.load.image('luigi', 'assets/splash/luigi.png');
    this.load.image('star', 'assets/splash/star.png');
    this.load.image('rock', 'assets/splash/rock.png');
    this.load.image('map', 'assets/splash/grass.png');
    this.load.image('dude', 'assets/splash/sprite.png');
    this.load.audio('music', 'assets/audio/QuantumLeap.mp3');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = this.add.sprite(0, 0, 'map');

    this.rock1 = this.add.sprite(20, 200, 'rock');
    this.physics.arcade.enable(this.rock1);
    this.rock1.body.immovable = true;
    this.rock1.body.collideWorldBounds = true;

    this.rock2 = this.add.sprite(100, 240, 'rock');
    this.physics.arcade.enable(this.rock2);
    this.rock2.body.immovable = true;
    this.rock2.body.collideWorldBounds = true;

    this.rock3 = this.add.sprite(600, 280, 'rock');
    this.physics.arcade.enable(this.rock3);
    this.rock3.body.immovable = true;
    this.rock3.body.collideWorldBounds = true;

    this.rock4 = this.add.sprite(250, 320, 'rock');
    this.physics.arcade.enable(this.rock4);
    this.rock4.body.immovable = true;
    this.rock4.body.collideWorldBounds = true;

    if (window.game.luigiComplete) {
      this.tank = this.add.sprite(100, 100, 'tank');
      this.physics.arcade.enable(this.tank);
      this.tank.body.immovable = true;
      this.tank.body.collideWorldBounds = true;
    } else {
      this.star = this.add.sprite(100, 100, 'star');
      this.physics.arcade.enable(this.star);
      this.star.body.immovable = true;
    }

    this.music = this.add.audio('music');
    this.music.play();

    this.bird = this.add.sprite(600, 100, 'bird');
    this.physics.arcade.enable(this.bird);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;

    this.luigi = this.add.sprite(100, 400, 'luigi');
    this.physics.arcade.enable(this.luigi);
    this.luigi.body.immovable = true;
    this.luigi.body.collideWorldBounds = true;

    this.brick = this.add.sprite(600, 400, 'brick');
    this.physics.arcade.enable(this.brick);
    this.brick.body.immovable = true;
    this.brick.body.collideWorldBounds = true;

    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    // this.physics.arcade.collide(this.button, this.dude);
    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else if (this.cursors.up.isDown) {
      //  Move to the right
      this.player.body.velocity.y = -150;
      this.player.animations.play('up');
    } else if (this.cursors.down.isDown) {
      //  Move to the right
      this.player.body.velocity.y = 150;
      this.player.animations.play('down');
    } else {
      //  Stand still
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToTank();
    }
    if (this.physics.arcade.collide(this.player, this.bird)) {
      this.goToFlappy();
    }
    if (this.physics.arcade.collide(this.player, this.luigi)) {
      this.goToLuigi();
    }
    if (this.physics.arcade.collide(this.player, this.brick)) {
      this.goToBreakout();
    }
    this.physics.arcade.collide(this.player, this.rock1);
    this.physics.arcade.collide(this.player, this.rock2);
    this.physics.arcade.collide(this.player, this.rock3);
    this.physics.arcade.collide(this.player, this.rock4);
    this.physics.arcade.collide(this.player, this.star);
  }

  goToTank () {
    this.state.start('TankMenu');
    this.music.stop();
  }

  goToLuigi () {
    this.state.start('Luigi');
    this.music.stop();
  }

  goToFlappy () {
    this.state.start('Flappy');
    this.music.stop();
  }

  goToBreakout () {
    this.state.start('Breakout');
    this.music.stop();
  }
}
