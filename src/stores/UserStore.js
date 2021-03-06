import { extendObservable } from 'mobx';
import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';
import Game from '../main.js';

export default class UserStore {
  constructor  () {
    extendObservable(this, {
      name: "",
      password: "",
      admin: false,
      email: "",
      loginMsg: "",
      loggedInUser: false,
      failedLogin: false,
      newUserCreated: false,
      userAlreadyExists: false,
      id: "",
      token: "",
      hiScores: [],
    });
    this.LoginUser = this.LoginUser.bind(this);
    // this.getScores(() => {
    //   this.displayScores();
    // });
  }

  getScores () {
    fetch('/api/getUserScores', {
      method:"GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(result => result.json())
    .then(data => {
      data.sort(function(a, b) {
        return (parseFloat(a.flappyHighScore) - parseFloat(b.flappyHighScore));
      })
      data.reverse();
      this.hiScores = data;
      console.log(this.hiScores);
    });
  }



  // removeCollectable(){
  //   let collectable = this[collectionname].find(function(y){
  //     return y.name==collectablename;
  //   });
  //   fetch(`/api/remove`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       collectable: collectable,
  //       collectionname: collectionname
  //     })
  //   }).then(result=>{
  //     let collectableposition = this[collectionname].indexOf(collectable);
  //     this[collectionname].splice(collectableposition, 1);}
  //   );
  // }
  //
  // addCollectable(username, collectablename, collectionname){
  //   let collectable = {name: collectablename, date: new Date().toJSON()};
  //   fetch(`/api/add`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       collectable: collectable,
  //       collectionname: collectionname
  //     })
  //   }).then(this[collectionname].push(collectable));
  // }

  logUserOut(){
    this.name= "";
    this.password= "";
    this.loggedInUser= false;
    this.id= "";
    this.token= "";
    this.luigiCompleted = false;
    this.tankCompleted = false;
    this.flappyCompleted = false;
    this.breakoutCompleted = false;
    this.flappyHighScore = false;
    this.breakoutHighScore = false;
    browserHistory.push('/Welcome');
    window.game.destroy();
  }

  UpdateUser (name, luigiCompleted){
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

  LoginUser(name, password) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password
      })
    })
    .then(function(result) {
      return result.json();})
    .then(loginCred => {
      if (loginCred.success && loginCred.token) {
        this.failedLogin=false;
        this.id = loginCred.id;
        this.token = loginCred.token;
        this.loggedInUser = true;
        this.name = name.toLowerCase();
        this.newUserCreated = false;
        this.userAlreadyExists = false;
        this.failedLogin=false;
        browserHistory.push('/Dashboard');
        console.log("Starting a game");
        window.game = new Game(this.name);
      } else {
        this.loggedInUser=false;
        this.failedLogin=true;
        this.name="";
        browserHistory.push('/Welcome');
      }
    });
  }
}
