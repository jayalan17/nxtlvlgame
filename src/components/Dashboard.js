import React from 'react';
import { inject, observer } from 'mobx-react';
import { Well } from 'react-bootstrap';
import './style/dashboardStyle.css';


class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      activityList: [],
    };
  }

  // componentWillMount() {
  //   this.setState({
  //     activityList: this.props.userStore.getActivityList()
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     activityList: nextProps.userStore.getActivityList()
  //   });
  // }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <div style={{
          border: "1px solid #bcbcbc",
          backgroundColor: "rgba(193, 193, 192, .5)"}}>
          <h4 className="head">Shall we play a game...</h4>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
