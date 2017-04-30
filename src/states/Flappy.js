import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class Flappy extends Phaser.State {
  preload () {
    this.load.image('bird', 'assets/flappy/frenz.jpg');
    this.load.image('pipe', 'assets/flappy/frog.png');
    this.load.image('sky', 'assets/flappy/sky2.png');
    this.load.audio('jump', 'assets/audio/jump_07.wav');
    this.load.audio('hit', 'assets/audio/nes-05-03.wav');
    this.load.audio('music', 'assets/audio/SouthPark.mp3');
    this.load.audio('boom', 'assets/Menu/explosion.wav');

  }

  create () {
    // Change the background color of the game to blue
    this.stage.backgroundColor = '#48A0D0';
    this.add.sprite(0, 0, 'sky');
    // Create an empty group
    this.pipes = this.add.group();

    this.jumpSound = this.add.audio('jump');
    this.hitSound = this.add.audio('hit');
    this.dieSound = this.add.audio('boom');
    this.music = this.add.audio('music');
    this.music.play();
    // Set the physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // Display the bird at the position x=100 and y=245
    this.bird = this.add.sprite(100, 245, 'bird');
    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    this.physics.arcade.enable(this.bird);
    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;
    // Call the 'jump' function when the spacekey is hit
    var spaceKey = this.input.keyboard.addKey(
                  Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    this.escape = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

    this.timer = this.time.events.loop(1500, this.addRowOfPipes, this);
    this.score = 0;
    this.labelScore = this.add.text(20, 20, '0',
    { font: '30px Arial', fill: '#ffffff' });
    // Move the anchor to the left and downward
    this.bird.anchor.setTo(-0.2, 0.5);
  }

  update () {
    if (this.escape.isDown) {
      this.goHome();
      // If the bird is out of the screen (too high or too low)
      // Call the 'restartGame' function
    } else if (this.bird.y < 5 || this.bird.y > 800) {
      this.restartGame();
    }
    this.physics.arcade.overlap(
    this.bird, this.pipes, this.hitPipe, null, this);
    if (this.bird.angle < 20) {
      this.bird.angle += 1;
    }
  }
  // Make the bird jump
  jump () {
    if (this.bird.alive === false) {
      return;
    }
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
    // Create an animation on the bird
    var animation = this.add.tween(this.bird);
    // Change the angle of the bird to -20° in 100 milliseconds
    animation.to({angle: -20}, 100);
    // And start the animation
    animation.start();
    this.jumpSound.play();
  }
// Restart the game
  restartGame () {
    // Start the 'main' state, which restarts the game
    this.state.start('FlappyGameOver');
    this.music.stop();
    this.dieSound.play();
  }
  addOnePipe (x, y) {
    // Create a pipe at the position x and y
    this.pipe = this.add.sprite(x, y, 'pipe');
    // Add the pipe to our previously created group
    this.pipes.add(this.pipe);
    // Enable physics on the pipe
    this.physics.arcade.enable(this.pipe);
    // Add velocity to the pipe to make it move left
    this.pipe.body.velocity.x = -200;
    // Automatically kill the pipe when it's no longer visible
    this.pipe.checkWorldBounds = true;
    this.pipe.outOfBoundsKill = true;
  }
  gameWin () {
    this.state.start('FlappyWin');
    this.music.stop();
  }
  addRowOfPipes () {
    this.score += 1;
    this.labelScore.text = this.score;
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    this.hole = Math.floor(Math.random() * 5) + 1;
    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (let i = 0; i < 20; i++) {
      if (i !== this.hole && i !== this.hole + 1) {
        this.addOnePipe(800, i * 60 + 10);
      }
      if (this.score > 5) {
        this.gameWin();
      }
    }
  }
  hitPipe () {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    if (this.bird.alive === false) {
      return;
    }
    // Set the alive property of the bird to false
    this.bird.alive = false;

    // Prevent new pipes from appearing
    this.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function (p) {
      p.body.velocity.x = 0;
    }, this);
    this.hitSound.play();
  }
  goHome () {
    this.state.start('FlappyMenu');
    window.game.flappyCompleted();
    // this.resetGame();
  }
  playerUpdate () {
    window.game.flappyCompleted();
  }

}
