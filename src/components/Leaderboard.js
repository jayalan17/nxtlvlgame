/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
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
    

    // this.setState({
    //   hiScores: this.props.userStore.displayScores()
    // });
  }

  // getScores () {
  //   fetch('/api/getUserScores', {
  //     method:"GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //   })
  //   .then(result => result.json())
  //   .then(data => {
  //     console.log(data);
  //     this.setState({hiScores: data});
  //     console.log(this.hiScores);
  //   });
  // }
  //
  // displayScores () {
  //   console.log(this.hiScores);
  //   return (
  //     <div>
  //       <h5>1. </h5>
  //     </div>
  //   );}


  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
        {this.props.userStore.displayScores()}
      </div>
    );
  }
}

Leaderboard.propTypes = {
  userStore: React.PropTypes.object,
};

export default inject("userStore")(observer(Leaderboard));
