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

  render() {
    return (
      <div>
        <h3 style={{fontWeight: "bold", color: "#ea1828"}}>FLAPPIN HIGH SCORES</h3>
        {this.props.userStore.displayScores()}
      </div>
    );
  }
}

Leaderboard.propTypes = {
  userStore: React.PropTypes.object,
};

export default inject("userStore")(observer(Leaderboard));
