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
      font: 'bold 72pt TheMinion',
      fill: 'red',
      align: 'center'
    });
    this.titleText2 = this.make.text(this.world.centerX, 150, 'You need a minimum of 20 points to proceed!', {
      font: 'bold 20pt TheMinion',
      fill: 'black',
      align: 'left'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('title', 'assets/logo.png');
    this.load.image('startButton', 'assets/Menu/power.png');
    this.load.image('stopButton', 'assets/cancel.png');
    this.load.image('background', 'assets/Menu/gameoverwall.jpg');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.background = this.add.sprite(0, 0, 'background');
    this.add.sprite(0, 0, 'background');

    // this.stage.disableVisibilityChange = true;
    this.add.existing(this.titleText);
    this.add.existing(this.titleText2);

    this.music = this.add.audio('mainTitle');

    this.music.play();

    // You can listen for each of these events from Phaser.Loader
    this.load.onLoadStart.add(this.loadStart, this);
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    // Just to kick things off
    // this.button = this.add.button(this.world.centerY - 100, 300, 'button', this.goToGame, this, 2, 1, 0);
    this.startButton = this.add.button(200, 400, 'startButton', this.goToFlappy, this, 2, 1, 0);
    this.stopButton = this.add.button(450, 400, 'stopButton', this.goHome, this, 2, 1, 0);
    // this.flappyButton = this.add.button(this.world.centerY - 100, 200, 'flappyButton', this.goToFlappy, this, 2, 1, 0);
    // this.breakoutButton = this.add.button(this.world.centerY - 100, 50, 'breakoutButton', this.goToBreakOut, this, 2, 1, 0);

    this.text = this.add.text({ fill: '#ffffff' });
    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    // this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    // this.player.animations.add('up', [0, 1, 2, 3], 10, true);
    // this.player.animations.add('down', [5, 6, 7, 8], 10, true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
  }

  update () {
    if (this.escape.isDown) {
      this.goHome();
      this.music.stop();
    }

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
    // if (this.physics.arcade.collide(this.player, this.mushroom)) {
    //   this.goToGame();
    // }
    if (this.physics.arcade.collide(this.player, this.luigi)) {
      this.goToLuigi();
    }
    if (this.physics.arcade.collide(this.player, this.brick)) {
      this.goToBreakOut();
    }
    this.physics.arcade.collide(this.player, this.rock1);
    this.physics.arcade.collide(this.player, this.rock2);
    this.physics.arcade.collide(this.player, this.rock3);
    this.physics.arcade.collide(this.player, this.rock4);
  }

  goToFlappy () {
    this.state.start('Flappy');
    this.music.stop();
  }

  goHome () {
    this.state.start('Splash');
    // this.resetGame();
  }

  loadStart () {
    this.text.setText('Loading ...');
  }

  // This callback is sent the following parameters:
  fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.text.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);

    var newImage = this.add.image(this.x, this.y, cacheKey);

    newImage.scale.set(0.3);

    this.x += newImage.width + 20;

    if (this.x > 700) {
      this.x = 32;
      this.y += 332;
    }
  }

  loadComplete () {
    this.text.setText('Load Complete');
  }
}
