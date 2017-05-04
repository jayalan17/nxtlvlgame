/* Importing the neccesary components*/
import React from 'react';
import { inject, observer } from 'mobx-react';

class Leaderboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hiScores: []
    };
  }

  componentWillMount(){
    this.props.userStore.getScores();
  }

  displayScores () {
    let scoreArray = [];
    this.props.userStore.hiScores.forEach((userScore, i) => {
      if (i < 10){
        scoreArray.push(
          <h5>{i + 1}.&nbsp;&nbsp;&nbsp;
          {userScore.name}  ===>  {userScore.flappyHighScore}</h5>
        );
      }
    });
    return (
      <div>
        {scoreArray}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3 style={{fontWeight: "bold", color: "#ea1828"}}>
        FLAPPIN HIGH SCORES</h3>
        {this.displayScores()}
      </div>
    );
  }
}

Leaderboard.propTypes = {
  userStore: React.PropTypes.object,
};

export default inject("userStore")(observer(Leaderboard));
