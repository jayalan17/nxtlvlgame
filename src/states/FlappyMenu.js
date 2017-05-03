import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class FlappyMenu extends Phaser.State {
  constructor () {
    super();
    this.x = 32;
    this.y = 80;
  }

  init () {
    this.titleText = this.make.text(this.world.centerX, 100, "FLAPPIN'", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });

    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  preload () {
    this.load.image('bird', 'assets/splash/star.png');
    this.load.image('map', 'assets/Menu/map.png');
    this.load.spritesheet('dude', 'assets/splash/sprite.png', 32, 32);
    this.load.image('background', 'assets/Menu/paperBG.jpg');
    this.load.audio('music', 'assets/Menu/itszacrime.mp3');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'background');

    this.add.existing(this.titleText);
    this.fs = this.add.text(this.world.centerX, 150, 'Your Flappin High Score: ' + window.game.flappyHighScore,
    { fontSize: '20px', fill: 'black', align: 'center' });
    this.fs.anchor.set(0.5);

    this.add.text(75, 200, 'INSTRUCTIONS: \nFLY Through 20 Groups\nOf Frogs To Advance',
    { fontSize: '20px', fill: 'black' });
    this.add.text(475, 200, 'CONTROLS:\n- Tap SPACEBAR to Fly\n- <esc> - Return To Map',
    { fontSize: '20px', fill: 'black' });


    this.music = this.add.audio('music');
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
