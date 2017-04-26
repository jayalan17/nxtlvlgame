import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import Splash from './states/Splash';
import Tank from './states/Tank';
import Luigi from './states/Luigi';
import Flappy from './states/Flappy';
import Breakout from './states/Breakout';
import LuigiMenu from './states/LuigiMenu';
import TankMenu from './states/TankMenu';
import FlappyMenu from './states/FlappyMenu';
import BreakoutMenu from './states/BreakoutMenu';

import config from './gameConfig';

class Game extends Phaser.Game {
  constructor () {
    console.log("Contstructing game");
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.luigiComplete = true;
    this.tankComplete = false;
    this.flappyComplete = false;
    this.breakoutComplete = false;

    this.state.add('Splash', Splash, false);
    this.state.add('Tank', Tank, false);
    this.state.add('Luigi', Luigi, false);
    this.state.add('Flappy', Flappy, false);
    this.state.add('Breakout', Breakout, false);
    this.state.add('LuigiMenu', LuigiMenu, false);
    this.state.add('TankMenu', TankMenu, false);
    this.state.add('FlappyMenu', FlappyMenu, false);
    this.state.add('BreakoutMenu', BreakoutMenu, false);

    this.state.start('Splash');
  }
  luigiCompleted () {
    this.luigiComplete = true;
    console.log('Luigi: ' + this.luigiComplete);
  }
  tankCompleted () {
    this.tankComplete = true;
    console.log('Tank: ' + this.tankComplete);
  }
  flappyCompleted () {
    this.flappyComplete = true;
    console.log('Flappy: ' + this.flappyComplete);
  }
  breakoutCompleted () {
    this.breakoutComplete = true;
    console.log('Breakout: ' + this.breakoutComplete);
  }
}
export default Game;
