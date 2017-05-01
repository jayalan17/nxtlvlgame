import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Splash from './states/Splash';
import Tank from './states/Tank';
import Luigi from './states/Luigi';
import Flappy from './states/Flappy';
import Breakout from './states/Breakout';
import LuigiMenu from './states/LuigiMenu';
import TankMenu from './states/TankMenu';
import FlappyMenu from './states/FlappyMenu';
import BreakoutMenu from './states/BreakoutMenu';
import FlappyGameOver from './states/FlappyGameOver';
import BreakoutGameOver from './states/breakoutGameOver';
import TankGameOver from './states/TankGameOver';
import LuigiGameOver from './states/LuigiGameOver';
import FlappyWin from './states/FlappyWin';
import TankWin from './states/TankWin';
import BreakoutWin from './states/BreakoutWin';
import LuigiWin from './states/LuigiWin';
import UserStore from './stores/UserStore';

import config from './gameConfig';

class Game extends Phaser.Game {
  constructor (user) {
    console.log("Constructing game");
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.CANVAS, 'content', null);

    this.user = user;
    console.log(this.user + " help");
    this.GetStatus(() => {
      this.state.start('Splash');
    });

    this.luigiComplete = false;
    this.tankComplete = false;
    this.flappyComplete = false;
    this.breakoutComplete = false;
    this.shovelGot = false;
    this.seedsGot = false;
    this.waterGot = false;
    this.counter = 0;
    this.farmingComplete = false;

    this.state.add('Splash', Splash, false);
    this.state.add('Tank', Tank, false);
    this.state.add('Luigi', Luigi, false);
    this.state.add('Flappy', Flappy, false);
    this.state.add('Breakout', Breakout, false);
    this.state.add('LuigiMenu', LuigiMenu, false);
    this.state.add('TankMenu', TankMenu, false);
    this.state.add('FlappyMenu', FlappyMenu, false);
    this.state.add('BreakoutMenu', BreakoutMenu, false);
    this.state.add('FlappyGameOver', FlappyGameOver, false);
    this.state.add('BreakoutGameOver', BreakoutGameOver, false);
    this.state.add('TankGameOver', TankGameOver, false);
    this.state.add('LuigiGameOver', LuigiGameOver, false);
    this.state.add('FlappyWin', FlappyWin, false);
    this.state.add('TankWin', TankWin, false);
    this.state.add('BreakoutWin', BreakoutWin, false);
    this.state.add('LuigiWin', LuigiWin, false);
  }

  luigiCompleted () {
    this.luigiComplete = true;
    console.log('Luigi: ' + this.luigiComplete);
    this.updateLuigi(this.user, true);
  }
  tankCompleted () {
    this.tankComplete = true;
    console.log('Tank: ' + this.tankComplete);
    this.updateTank(this.user, true);
  }
  flappyCompleted () {
    this.flappyComplete = true;
    console.log('Flappy: ' + this.flappyComplete);
    this.updateFlappy(this.user, true);
  }
  breakoutCompleted () {
    this.breakoutComplete = true;
    console.log('Breakout: ' + this.breakoutComplete);
    this.updateBreakout(this.user, true);
  }

  updateLuigi (name, luigiCompleted){
    fetch('/api/changeLuigi', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        luigiCompleted: luigiCompleted
      })
    });
  }
  updateTank (name, tankCompleted){
    fetch('/api/changeTank', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        tankCompleted: tankCompleted
      })
    });
  }
  updateFlappy (name, flappyCompleted){
    fetch('/api/changeFlappy', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        flappyCompleted: flappyCompleted
      })
    });
  }
  updateBreakout (name, breakoutCompleted){
    fetch('/api/changeBreakout', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        breakoutCompleted: breakoutCompleted
      })
    });
  }
  GetStatus(x){
    fetch('/api/getUserStatus/' + this.user, {
      method:"GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(result => result.json())
    .then(data => {
      console.log(data);
      this.luigiComplete = data.luigiCompleted;
      this.tankComplete = data.tankCompleted;
      this.flappyComplete = data.flappyCompleted;
      this.breakoutComplete = data.breakoutCompleted;
      x();
    });
  }
}

// .then(data => this.weather = {conditions: data.weather[0].description, temp: data.main.temp, windSpeed: data.wind.speed, windDir: data.wind.deg });

// .then(function(result) {
    // return result.json();
    // th
    // })

// getUserFromDb() {
 //   fetch("/user/userData",{
 //     method:"GET",
 //     headers: {
 //       "Accept": "application/json",
 //       "Content-Type": "application/json",
 //       'Authorization': 'Bearer ' + this.getCookie('token')
 //     },
 //   })
 //   .then(result => result.json())
 //   .then(data => this.pets = data.pets);
 // }


export default Game;
