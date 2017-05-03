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
    });
  }

  sortScores () {
    let hs = [];
    for (let i = 0; i < this.hiScores.length; i++) {
      hs = hs.push(this.hiScores[i].flappyHighScore);
      this.hiScores = hs;
    }
    console.log(this.hiScores);
    return this.hiScores;
  }

  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
      </div>
    );
  }
}


Leaderboard.propTypes = {
  userStore: React.PropTypes.object,
};

export default inject("userStore")(observer(Leaderboard));
