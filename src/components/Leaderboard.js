/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';


class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.hiScores = [];
    this.getScores = this.getScores.bind(this);
  }

  componentDidMount(){
    this.getScores();
  }

  getScores(){
    fetch('/api/getUserScores', {
      method:"GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
    .then(result => result.json())
    .then(data => {
      this.hiScores = data;
      console.log(this.hiScores);
      this.sortScores();
      console.log(this.hiScores);
      this.displayScores();
    });
  }

  sortScores () {
    console.log(this.hiScores);
    console.log(this.hiScores.length);
    this.hiScores.sort(function(a, b) {
      return (parseFloat(a.flappyHighScore) - parseFloat(b.flappyHighScore));
    });
    this.hiScores.reverse();
  }

  displayScores () {
    console.log(this.hiScores);
    if(this.hiScores[0]){
    return (
      <div>
        <h5>1. </h5>
      </div>
    );}
    else{
      return (null);
    }
  }

  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
        {this.displayScores()}
      </div>
    );
  }
}


Leaderboard.propTypes = {
  userStore: React.PropTypes.object,
};

export default inject("userStore")(observer(Leaderboard));
