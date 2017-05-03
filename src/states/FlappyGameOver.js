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
    this.titleText = this.make.text(this.world.centerX, 200, 'Game Over.\nPlay Again?', {
      font: 'bold 72pt TheMinion',
      fill: 'darkred',
      align: 'center'
    });

    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

  }

  preload () {
    this.load.image('bird', 'assets/splash/bird.png');
    this.load.image('map', 'assets/Menu/map.png');
    this.load.image('dude', 'assets/splash/sprite.png');
    this.load.image('key', 'assets/Menu/key.png');
    this.load.image('background', 'assets/Menu/gameoverwall.jpg');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    if (!window.game.flappyComplete) {
      this.add.text(275, 350, 'You need 20 points to earn the key!',
      { fontSize: '16px', fill: 'black' });
    }
    this.music = this.add.audio('mainTitle');
    this.music.play();


    this.bird = this.add.sprite(200, 400, 'bird');
    this.physics.arcade.enable(this.bird);
    this.bird.body.immovable = true;

    this.map = this.add.sprite(500, 400, 'map');
    this.physics.arcade.enable(this.map);
    this.map.body.immovable = true;

    this.player = this.add.sprite(350, 250, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

    if (window.game.flappyCounter == 1) {
      this.fs = this.add.text(this.world.centerX, 335, 'New High Score: ' + window.game.flappyHighScore + "!",
      { fontSize: '20px', fill: 'black', align: 'center' });
      this.fs.anchor.set(0.5);
      window.game.flappyCounter = 0;
    }
    else {
      this.fs = this.add.text(this.world.centerX, 335, 'You did not set a High Score.  Your Best Score: ' + window.game.flappyHighScore + ".",
      { fontSize: '20px', fill: 'black', align: 'center' });
      this.fs.anchor.set(0.5);
      window.game.flappyCounter = 0;
    }
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
    if (this.physics.arcade.collide(this.player, this.bird)) {
      this.goToGame();
    }
    if (this.physics.arcade.collide(this.player, this.map)) {
      this.goToHome();
    }
    this.physics.arcade.collide(this.player, this.key);
  }

  goToGame () {
    this.state.start('Flappy');
    this.music.stop();
  }
  goToHome () {
    this.state.start('Splash');
    this.music.stop();
    // this.resetGame();
  }
}
