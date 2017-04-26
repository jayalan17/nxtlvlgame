import React from 'react';
import { inject, observer } from 'mobx-react';
import { Well } from 'react-bootstrap';
import './style/dashboardStyle.css';
import Trophy from './Trophy';


class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      activityList: [],
    };
  }

  componentWillMount() {
    this.setState({
      activityList: this.props.userStore.getActivityList()
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activityList: nextProps.userStore.getActivityList()
    });
  }

  createTrophyCase(){
    if(this.props.userStore.loggedInUser){
      let displayTrophy = [
        <Trophy key="states" collectionName={"states"}/>,
        <Trophy key="parks" collectionName={"parks"}/>,
        <Trophy key="elevations" collectionName={"elevations"}/>,
        <Trophy key="mlbstadiums" collectionName={"mlbstadiums"}/>,
        <Trophy key="nflstadiums" collectionName={"nflstadiums"}/>,
        <Trophy key="airports" collectionName={"airports"}/>,];
      return displayTrophy;
    }
  }

  render() {
    return (
      <div>
        <div>
          <div style={{textAlign: "center"}}>
            <Well style={{
              border: "1px solid #bcbcbc",
              backgroundColor: "rgba(193, 193, 192, .5)"}}>
            <h4 className="head">Welcome</h4>
            </Well>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
