import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class Splash extends Phaser.State {
  constructor () {
    super();
  }

  preload () {
    this.load.image('coin', 'assets/splash/bitcoin.png');
    this.load.image('deer', 'assets/splash/deer.png');
    this.load.image('shovel', 'assets/splash/shovel.png');
    this.load.image('dude2', 'assets/splash/sprite2.png');
    this.load.image('seeds', 'assets/splash/seeds.png');
    this.load.image('dude3', 'assets/splash/sprite3.png');
    this.load.image('water', 'assets/splash/water.png');
    this.load.image('dude4', 'assets/splash/sprite4.png');
    this.load.image('tree', 'assets/splash/tree4.png');
    this.load.image('dirt', 'assets/splash/dirt.png');
    this.load.image('dirt2', 'assets/splash/dirt2.png');
    this.load.image('dirt3', 'assets/splash/dirt3.png');
    this.load.image('prison', 'assets/splash/prison.png');
    this.load.image('princess', 'assets/splash/princess.png');
    this.load.image('hearts', 'assets/splash/heart.png');

    this.load.image('tank', 'assets/splash/tank.png');
    this.load.image('bird', 'assets/splash/bird.png');
    this.load.image('brick', 'assets/splash/brick.png');
    this.load.image('luigi', 'assets/splash/mushroom.png');
    this.load.image('padlock', 'assets/splash/padlock.png');
    this.load.image('padlock2', 'assets/splash/padlock2.png');
    this.load.image('padlock3', 'assets/splash/padlock4.png');
    this.load.image('rock', 'assets/splash/rock.png');
    this.load.image('log', 'assets/splash/log.png');
    this.load.image('map', 'assets/splash/grass.png');
    this.load.image('dude', 'assets/splash/sprite.png');
    this.load.audio('music', 'assets/audio/HellsSymphony.mp3');
    this.load.audio('helpMe', 'assets/splash/Help-Me.wav');
    this.load.audio('shallwe', 'assets/audio/playgames.wav');
    this.load.audio('pickup', 'assets/audio/powerup.wav');
    this.load.audio('farmend', 'assets/Menu/ta-da.wav');

    console.log(window.game.luigiComplete);
    console.log(window.game.tankComplete);
    console.log(window.game.flappyComplete);
    console.log(window.game.breakoutComplete);
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.background = this.add.sprite(0, 0, 'map');


    this.story = this.make.text(200, 10, 'What a vibrant valley...so much to explore!',
    { fontSize: '16px', fill: 'orange', font: 'herculanum', textAlign: 'center' });

    this.princess = this.add.sprite(390, 100, 'princess');
    this.physics.arcade.enable(this.princess);
    this.princess.body.immovable = true;

    if (window.game.breakoutComplete) {
      this.hearts = this.add.sprite(387, 70, 'hearts');
      this.physics.arcade.enable(this.hearts);
      this.hearts.body.immovable = true;
    } else {
      this.prison = this.add.sprite(383, 95, 'prison');
      this.physics.arcade.enable(this.prison);
      this.prison.body.immovable = true;
    }

    this.dirt = this.add.sprite(520, 80, 'dirt');
    this.physics.arcade.enable(this.dirt);
    this.dirt.body.immovable = true;

    this.shovel = this.add.sprite(40, 200, 'shovel');
    this.physics.arcade.enable(this.shovel);
    this.shovel.body.immovable = true;

    this.seeds = this.add.sprite(170, 430, 'seeds');
    this.physics.arcade.enable(this.seeds);
    this.seeds.body.immovable = true;

    this.water = this.add.sprite(520, 380, 'water');
    this.physics.arcade.enable(this.water);
    this.water.body.immovable = true;

    this.rock2 = this.add.sprite(100, 240, 'rock');
    this.physics.arcade.enable(this.rock2);
    this.rock2.body.immovable = true;

    this.coin = this.add.sprite(740, 280, 'coin');
    this.physics.arcade.enable(this.coin);
    this.coin.body.immovable = true;

    this.deer = this.add.sprite(540, 200, 'deer');
    this.physics.arcade.enable(this.deer);
    this.deer.body.immovable = true;

    this.log = this.add.sprite(540, 220, 'log');
    this.physics.arcade.enable(this.log);
    this.log.body.immovable = true;

    this.rock3 = this.add.sprite(740, 280, 'rock');
    this.physics.arcade.enable(this.rock3);
    this.rock3.enableBody = true;

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
    this.princessSound = this.add.audio('helpMe');
    this.playSound = this.add.audio('shallwe');
    this.pickUpSound = this.add.audio('pickup');
    this.farmEnd = this.add.audio('farmend');

    if (window.game.tankComplete) {
      this.bird = this.add.sprite(650, 100, 'bird');
      this.physics.arcade.enable(this.bird);
      this.bird.body.immovable = true;
    } else {
      this.padlock2 = this.add.sprite(650, 100, 'padlock2');
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
      this.padlock3 = this.add.sprite(650, 400, 'padlock3');
      this.physics.arcade.enable(this.padlock3);
      this.padlock3.body.immovable = true;
    }

    this.player = this.add.sprite(400, 300, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    this.add.existing(this.story);

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
    if (this.physics.arcade.collide(this.player, this.tree)) {
      this.addText12();
    }
    if (this.physics.arcade.collide(this.player, this.rock2)) {
      this.addText7();
    }
    if (this.physics.arcade.collide(this.player, this.rock3)) {
      this.addText7();
    }
    if (this.physics.arcade.collide(this.player, this.rock4)) {
      this.addText7();
    }
    if (this.physics.arcade.collide(this.player, this.padlock1)) {
      this.addText3();
    }
    if (this.physics.arcade.collide(this.player, this.padlock2)) {
      this.addText3();
    }
    if (this.physics.arcade.collide(this.player, this.padlock3)) {
      this.addText3();
    }
    if (this.physics.arcade.collide(this.player, this.prison)) {
      this.addText2();
      this.princessSound.play();
    }
    if (this.physics.arcade.collide(this.player, this.tank)) {
      this.goToTank();
    }
    if (this.physics.arcade.collide(this.player, this.bird)) {
      this.goToFlappy();
    }
    if (this.physics.arcade.collide(this.player, this.luigi)) {
      this.goToLuigi();
      this.playSound.play();
    }
    if (this.physics.arcade.collide(this.player, this.brick)) {
      this.goToBreakout();
    }
    if (window.game.farmingComplete){
      this.shovel.kill();
      this.seeds.kill();
      this.water.kill();
      this.tree = this.add.sprite(430, 20, 'tree');
      this.physics.arcade.enable(this.tree);
      this.tree.body.immovable = true;
    }
    if (this.physics.arcade.collide(this.player, this.shovel)) {
      window.game.shovelGot = true;
      this.shovel.kill();
      this.player.kill();
      this.player = this.add.sprite(40, 180, 'dude2');
      this.physics.arcade.enable(this.player);
      this.player.body.collideWorldBounds = true;
      this.addText6();
    }
    if (this.physics.arcade.collide(this.player, this.seeds)) {
      this.addText5();
      if (window.game.shovelGot == true && window.game.counter == 1) {
        window.game.seedsGot = true;
        this.seeds.kill();
        this.player.kill();
        this.player = this.add.sprite(170, 410, 'dude3');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.addText8();
      }
    }
    if (this.physics.arcade.collide(this.player, this.water)) {
      this.addText4();
      if (window.game.shovelGot == true && window.game.seedsGot == true && window.game.counter == 2) {
        window.game.waterGot = true;
        this.water.kill();
        this.player.kill();
        this.player = this.add.sprite(520, 380, 'dude4');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.addText9();
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt)){
      this.addText1();
      if (window.game.shovelGot) {
        window.game.counter = 1;
        this.dirt.kill();
        this.dirt2 = this.add.sprite(520, 80, 'dirt2');
        this.physics.arcade.enable(this.dirt2);
        this.dirt2.body.immovable = true;
        this.player.kill();
        this.player = this.add.sprite(520, 80, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt2)) {
      this.addText10();
      if (window.game.shovelGot == true && window.game.seedsGot == true) {
        window.game.counter = 2;
        this.dirt2.kill();
        this.dirt3 = this.add.sprite(520, 80, 'dirt3');
        this.physics.arcade.enable(this.dirt3);
        this.dirt3.body.immovable = true;
        this.player.kill();
        this.player = this.add.sprite(520, 80, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt3)) {
      if (window.game.shovelGot == true && window.game.seedsGot == true && window.game.waterGot == true) {
        window.game.counter = 3;
        window.game.farmingCompleted();
        this.dirt3.kill();
        this.tree = this.add.sprite(430, 20, 'tree');
        this.physics.arcade.enable(this.tree);
        this.tree.body.immovable = true;
        this.player.kill();
        this.player = this.add.sprite(520, 80, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.farmEnd.play();
      }
    }
    if (this.physics.arcade.collide(this.player, this.princess)) {
      this.addText13();
    }
    if (this.physics.arcade.collide(this.player, this.coin)) {
      this.addText14();
    }
    if (this.physics.arcade.collide(this.player, this.log)) {
      this.addText15();
    }
  }

  addText1 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like I could plant something here.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText2 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like the princess has been captured!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText3 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like I need to find a key?!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText4 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like a watering can.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText5 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...is this a magic seed?!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText6 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like I found a shovel.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
    this.pickUpSound.play();

  }
  addText7 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'A simple rock.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText8 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like I found a magic seed!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
    this.pickUpSound.play();
  }
  addText9 () {
    this.story.destroy();
    this.story = this.make.text(200, 10, 'Hmm...looks like I found a watering can.',
    { fontSize: '16px', fill: 'orange', font: 'herculanum' });
    this.pickUpSound.play();
  }
  addText10 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like the soil is tilled.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText11 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like the sprout could use some water.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText12 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like my seed has blossomed into an awesome specimen!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText13 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like I saved the day.  Time to dance!',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText14 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'Hmm...looks like a bitcoin.  Nice.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
  }
  addText15 () {
    this.story.destroy();
    this.story = this.make.text(
      200, 10, 'A log.',
      { fontSize: '16px', fill: 'orange', font: 'herculanum' });
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
