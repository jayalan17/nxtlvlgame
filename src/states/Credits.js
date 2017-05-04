import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class Credits extends Phaser.State {
  constructor () {
    super();
  }

  preload () {
    this.creditCount = 0;
    this.load.image('end', 'assets/Menu/blackback.jpg');
    this.load.audio('music', 'assets/audio/binding-track.mp3');

  }

  addCredit (task, author) {
    var authorStyle = {
      font: '40pt TheMinion',
      fill: 'white',
      align: 'center',
      stroke: 'rgba(0,0,0,0)',
      strokeThickness: 4};
    var taskStyle = {
      font: '30pt TheMinion',
      fill: 'white',
      align: 'center',
      stroke: 'rgba(0,0,0,0)',
      strokeThickness: 4};
    var authorText = this.add.text(this.world.centerX, 900, author, authorStyle);
    var taskText = this.add.text(this.world.centerX, 950, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    this.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount ++;
  }



  create () {
    this.stage.disableVisibilityChange = true;
    this.music = this.add.audio('music');
    this.music.play();

    var bg = this.add.sprite(0, 0, 'end');
    this.addCredit('\nJeff Pawlak\nCalvin Stiff\nTim Walsh', 'Developers');
    this.addCredit('\nCalvin Stiff\nJeff Pawlak\nTim Walsh', 'Programmers');
    this.addCredit('Calvin Stiff', 'Map Design');
    this.addCredit('Jeff Pawlak', 'Leaderboards');
    this.addCredit('3x0pandemic', 'Music/Sound Design');
    this.addCredit('The Qtr 1 2017 Montana \nCode School Players', 'Testers');
    this.addCredit('\n\n\n\nHarold Shinsato\nRachael Harlow\nWoodie Tatz-Morey\nMontana Code School\nCoffee', 'Special Thanks');
    this.addCredit('Thank You For Playing!');
    this.addCredit('THE END?');
    this.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);

  }

}
