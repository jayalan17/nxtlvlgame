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
    this.load.image('luigi', 'assets/splash/mushroom.png');
    this.load.image('padlock', 'assets/splash/padlock.png');
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

    this.rock2 = this.add.sprite(100, 240, 'rock');
    this.physics.arcade.enable(this.rock2);
    this.rock2.body.immovable = true;

    this.rock3 = this.add.sprite(600, 280, 'rock');
    this.physics.arcade.enable(this.rock3);
    this.rock3.body.immovable = true;

    this.rock4 = this.add.sprite(250, 320, 'rock');
    this.physics.arcade.enable(this.rock4);
    this.rock4.body.immovable = true;

    if (window.game.luigiComplete) {
      this.tank = this.add.sprite(100, 100, 'tank');
      this.physics.arcade.enable(this.tank);
      this.tank.body.immovable = true;
    } else {
      this.padlock1 = this.add.sprite(100, 100, 'padlock');
      this.physics.arcade.enable(this.padlock1);
      this.padlock1.body.immovable = true;
    }

    this.music = this.add.audio('music');
    this.music.play();

    if (window.game.tankComplete) {
      this.bird = this.add.sprite(650, 100, 'bird');
      this.physics.arcade.enable(this.bird);
      this.bird.body.immovable = true;
    } else {
      this.padlock2 = this.add.sprite(650, 100, 'padlock');
      this.physics.arcade.enable(this.padlock2);
      this.padlock2.body.immovable = true;
    }

    this.luigi = this.add.sprite(100, 400, 'luigi');
    this.physics.arcade.enable(this.luigi);
    this.luigi.body.immovable = true;
    this.luigi.body.collideWorldBounds = true;

    if (window.game.flappyComplete) {
      this.brick = this.add.sprite(650, 400, 'brick');
      this.physics.arcade.enable(this.brick);
      this.brick.body.immovable = true;
    } else {
      this.padlock3 = this.add.sprite(650, 400, 'padlock');
      this.physics.arcade.enable(this.padlock3);
      this.padlock3.body.immovable = true;
    }

    this.player = this.add.sprite(400, 300, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
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
    this.physics.arcade.collide(this.player, this.padlock1);
    this.physics.arcade.collide(this.player, this.padlock2);
    this.physics.arcade.collide(this.player, this.padlock3);
  }

  goToTank () {
    this.state.start('TankMenu');
    this.music.stop();
  }
  goToLuigi () {
    this.state.start('LuigiMenu');
    this.music.stop();
  }
  goToFlappy () {
    this.state.start('FlappyMenu');
    this.music.stop();
  }
  goToBreakout () {
    this.state.start('BreakoutMenu');
    this.music.stop();
  }
}
