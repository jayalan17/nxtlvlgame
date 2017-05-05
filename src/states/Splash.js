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
    this.load.image('deer2', 'assets/splash/deer2.png');
    this.load.image('shovel', 'assets/splash/shovel.png');
    this.load.spritesheet('dude2', 'assets/splash/sprite.png', 32, 32);
    this.load.image('seeds', 'assets/splash/seeds.png');
    this.load.spritesheet('dude3', 'assets/splash/sprite.png', 32, 32);
    this.load.image('water', 'assets/splash/water.png');
    this.load.spritesheet('dude4', 'assets/splash/sprite.png', 32, 32);
    this.load.image('tree', 'assets/splash/tree.png');
    this.load.image('dirt', 'assets/splash/dirt.png');
    this.load.image('dirt2', 'assets/splash/dirt2.png');
    this.load.image('dirt3', 'assets/splash/dirt3.png');
    this.load.image('prison', 'assets/splash/prison.png');
    this.load.image('princess', 'assets/splash/princess.png');
    this.load.image('hearts', 'assets/splash/heart.png');

    this.load.image('tank', 'assets/splash/tank.png');
    this.load.image('bird', 'assets/splash/flappyscroll.png', 32, 32);
    this.load.image('brick', 'assets/splash/brick.png');
    this.load.image('luigi', 'assets/splash/luigiscroll.png');
    this.load.image('padlock', 'assets/splash/padlock3.png');
    this.load.image('padlock2', 'assets/splash/padlock2.png');
    this.load.image('padlock3', 'assets/splash/padlock4.png');
    this.load.image('rock', 'assets/splash/rock.png');
    this.load.image('log', 'assets/splash/log.png');
    this.load.image('map', 'assets/splash/grass.png');
    this.load.spritesheet('dude', 'assets/splash/sprite.png', 32, 32);
    this.load.audio('music', 'assets/audio/HellsSymphony.mp3');
    this.load.audio('helpMe', 'assets/audio/saveme.wav');
    this.load.audio('thanks', 'assets/audio/thanks.wav');
    this.load.audio('shallwe', 'assets/audio/playgames.wav');
    this.load.audio('pickup', 'assets/audio/powerup.wav');
    this.load.audio('farmend', 'assets/Menu/ta-da.wav');
    this.load.audio('money', 'assets/luigi/cha-ching.wav');

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

    if (window.game.breakoutComplete) {
      this.story = this.make.text(this.world.centerX, 30, 'The princess has been freed!!',
        { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
      this.story.anchor.set(0.5);
    } else {
      this.story = this.make.text(this.world.centerX, 30, 'What a vibrant valley...so much to explore!',
        { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack', textAlign: 'center' });
      this.story.anchor.set(0.5);
    }

    this.princess = this.add.sprite(650, 96, 'princess');
    this.physics.arcade.enable(this.princess);
    this.princess.body.immovable = true;

    if (window.game.breakoutComplete) {
      this.hearts = this.add.sprite(650, 70, 'hearts');
      this.physics.arcade.enable(this.hearts);
      this.hearts.body.immovable = true;
    } else {
      this.prison = this.add.sprite(650, 95, 'prison');
      this.physics.arcade.enable(this.prison);
      this.prison.body.immovable = true;
    }

    this.dirt = this.add.sprite(470, 100, 'dirt');
    this.physics.arcade.enable(this.dirt);
    this.dirt.body.immovable = true;

    this.shovel = this.add.sprite(70, 200, 'shovel');
    this.physics.arcade.enable(this.shovel);
    this.shovel.body.immovable = true;

    this.seeds = this.add.sprite(350, 400, 'seeds');
    this.physics.arcade.enable(this.seeds);
    this.seeds.body.immovable = true;

    this.water = this.add.sprite(577, 491, 'water');
    this.physics.arcade.enable(this.water);
    this.water.body.immovable = true;

    this.rock2 = this.add.sprite(80, 260, 'rock');
    this.physics.arcade.enable(this.rock2);
    this.rock2.body.immovable = true;

    this.coin = this.add.sprite(740, 280, 'coin');
    this.physics.arcade.enable(this.coin);
    this.coin.body.immovable = true;

    this.deer = this.add.sprite(540, 200, 'deer');
    this.physics.arcade.enable(this.deer);
    this.deer.body.immovable = true;

    this.log = this.add.sprite(540, 230, 'log');
    this.physics.arcade.enable(this.log);
    this.log.body.immovable = true;

    this.log2 = this.add.sprite(340, 440, 'log');
    this.physics.arcade.enable(this.log2);
    this.log2.body.immovable = true;

    this.log3 = this.add.sprite(280, 500, 'log');
    this.physics.arcade.enable(this.log3);
    this.log3.body.immovable = true;

    this.rock3 = this.add.sprite(740, 280, 'rock');
    this.physics.arcade.enable(this.rock3);
    this.rock3.enableBody = true;

    this.rock4 = this.add.sprite(250, 320, 'rock');
    this.physics.arcade.enable(this.rock4);
    this.rock4.body.immovable = true;

    if (window.game.luigiComplete) {
      this.tank = this.add.sprite(534, 537, 'tank');
      this.physics.arcade.enable(this.tank);
      this.tank.body.immovable = true;
    } else {
      this.padlock1 = this.add.sprite(534, 537, 'padlock');
      this.physics.arcade.enable(this.padlock1);
      this.padlock1.body.immovable = true;
    }

    this.music = this.add.audio('music');
    this.music.play();
    this.princessSound = this.add.audio('helpMe');
    this.princessThanks = this.add.audio('thanks');
    this.moneySound = this.add.audio('money');
    this.playSound = this.add.audio('shallwe');
    this.pickUpSound = this.add.audio('pickup');
    this.farmEnd = this.add.audio('farmend');

    if (window.game.tankComplete) {
      this.bird = this.add.sprite(33, 420, 'bird');
      this.physics.arcade.enable(this.bird);
      this.bird.body.immovable = true;
    } else {
      this.padlock2 = this.add.sprite(33, 420, 'padlock2');
      this.physics.arcade.enable(this.padlock2);
      this.padlock2.body.immovable = true;
    }

    this.luigi = this.add.sprite(240, 480, 'luigi');
    this.physics.arcade.enable(this.luigi);
    this.luigi.body.immovable = true;
    this.luigi.body.collideWorldBounds = true;

    if (window.game.flappyComplete) {
      this.brick = this.add.sprite(750, 388, 'brick');
      this.physics.arcade.enable(this.brick);
      this.brick.body.immovable = true;
    } else {
      this.padlock3 = this.add.sprite(750, 388, 'padlock3');
      this.physics.arcade.enable(this.padlock3);
      this.padlock3.body.immovable = true;
    }

    this.player = this.add.sprite(300, 285, 'dude');
    this.physics.arcade.enable(this.player);
  //   this.player.body.collideWorldBounds = true;
    this.player.animations.add('up', [104, 105, 106, 107, 108,
      109, 110, 111, 112], 9, true);
    this.player.animations.add('down', [130, 131, 132, 133, 134, 135, 136, 137, 138], 9, true);
    this.player.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 9, true);
    this.player.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 9, true);
    //this.bird.animations.add('c', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    // this.tank.animations.add('a', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
    // this.brick.animations.add('b', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);





    this.cursors = this.input.keyboard.createCursorKeys();
    // this.window.game.camera.scale.setTo(2);

    this.world.scale.setTo(1);

  }

  update () {
    this.add.existing(this.story);
    this.camera.follow(this.player);

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
      this.player.animations.play(this.stopAnimation());
    }

    if (this.physics.arcade.collide(this.player, this.tree)) {
      this.addText12();
    }
    if (this.physics.arcade.collide(this.player, this.rock2)) {
      this.addText7();
    }
    if (this.physics.arcade.collide(this.player, this.rock3)) {
      this.addText7();
      this.moneySound.play();
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
      this.tree = this.add.sprite(470, 40, 'tree');
      this.physics.arcade.enable(this.tree);
      this.tree.body.immovable = true;
    }
    if (this.physics.arcade.collide(this.player, this.shovel)) {
      window.game.shovelGot = true;
      this.shovel.kill();
      this.addText6();
    }
    if (this.physics.arcade.collide(this.player, this.seeds)) {
      this.addText5();
      if (window.game.shovelGot == true && window.game.counter == 1) {
        window.game.seedsGot = true;
        this.seeds.kill();
        this.addText8();
      }
    }
    if (this.physics.arcade.collide(this.player, this.water)) {
      this.addText4();
      if (window.game.shovelGot == true && window.game.seedsGot == true && window.game.counter == 2) {
        window.game.waterGot = true;
        this.water.kill();
        this.addText9();
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt)){
      this.addText1();
      if (window.game.shovelGot) {
        window.game.counter = 1;
        this.dirt.kill();
        this.dirt2 = this.add.sprite(470, 100, 'dirt2');
        this.physics.arcade.enable(this.dirt2);
        this.dirt2.body.immovable = true;
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt2)) {
      this.addText10();
      if (window.game.shovelGot == true && window.game.seedsGot == true) {
        window.game.counter = 2;
        this.dirt2.kill();
        this.dirt3 = this.add.sprite(470, 70, 'dirt3');
        this.physics.arcade.enable(this.dirt3);
        this.dirt3.body.immovable = true;
      }
    }
    if (this.physics.arcade.collide(this.player, this.dirt3)) {
      this.addText11();
      if (window.game.shovelGot == true && window.game.seedsGot == true && window.game.waterGot == true) {
        window.game.counter = 3;
        window.game.farmingCompleted();
        this.dirt3.kill();
        this.tree = this.add.sprite(470, 40, 'tree');
        this.physics.arcade.enable(this.tree);
        this.tree.body.immovable = true;
        this.farmEnd.play();
      }
    }
    if (this.physics.arcade.collide(this.player, this.princess)) {
      this.addText13();
      this.princessThanks.play();
    }
    if (this.physics.arcade.collide(this.player, this.coin)) {
      this.addText14();
    }
    if (this.physics.arcade.collide(this.player, this.log)) {
      this.addText15();
    }
    if (this.physics.arcade.collide(this.player, this.log2)) {
      this.addText15();
    }
    if (this.physics.arcade.collide(this.player, this.log3)) {
      this.addText15();
    }
    if (this.physics.arcade.collide(this.player, this.deer)) {
      this.addText16();
      this.deer.kill();
      this.deer2 = this.add.sprite(540, 200, 'deer2');
      this.physics.arcade.enable(this.deer2);
      this.deer2.body.velocity.x = 300;
      this.deer = this.add.sprite(340, 410, 'deer');
    }
    //  this.bird.animations.play('c');
    // this.tank.animations.play('a');
    // this.brick.animations.play('b');
  }

  stopAnimation() {
    //  This method will reset the frame to frame 1 after stopping
    this.player.animations.stop(null, true);
  }

  addText1 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like I could plant something here.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText2 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like the princess has been captured!',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText3 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like I need to find a key?!',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText4 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like a water barrel.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText5 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...are these magic seeds?!',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText6 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like I found a shovel.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
    this.pickUpSound.play();

  }
  addText7 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Some baskets.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText8 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like I found magic seeds!',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
    this.pickUpSound.play();
  }
  addText9 () {
    this.story.destroy();
    this.story = this.make.text(this.world.centerX, 30, 'Hmm...looks like I found water.',
    { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
    this.pickUpSound.play();
  }
  addText10 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like the soil is tilled.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText11 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like the sprout could use some water.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText12 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like my plant is all grown up.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText13 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like I saved the day.  Time to dance!',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
    this.state.start('Credits');
    this.music.stop();
  }
  addText14 () {
    this.story.destroy();
    this.story = this.make.text(
      this.world.centerX, 30, 'Hmm...looks like a bitcoin.  Nice.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText15 () {
    this.story.destroy();
    this.story = this.make.text(this.world.centerX, 30, 'A log.',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
  }
  addText16 () {
    this.story.destroy();
    this.story = this.make.text(this.world.centerX, 30, 'Aaahhh....',
      { fontSize: '32px', fill: '#f8ff42', font: 'arialBlack' });
    this.story.anchor.set(0.5);
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
