/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Navbar } from 'react-bootstrap';
import './style/navBarStyle.css';
import injectTapEventPlugin from "react-tap-event-plugin";


class ControlBar extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.createNavBar = this.createNavBar.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  logOutHandler(){
    this.props.userStore.logUserOut();
  }

  createNavBar(){


      return (
        <div>
          <Navbar staticTop collapseOnSelect fluid>
            <Navbar .Header>
              <Navbar .Brand>
                <Link className= "lgo" to={{pathname: '/Dashboard'}}>
                  <img className="hidden-xs"
                    src={require('../img/rp1.png')}
                    width="209px" height="96px"/>
                </Link>
                <Link className= "lgo" to={{pathname: '/Dashboard'}}>
                  <img className="hidden-md hidden-lg hidden-sm"
                    src={require('../img/rp1.png')}
                    width="104.5px"
                    height="48px"/>
                </Link>
              </Navbar .Brand>
            <Navbar .Toggle />
            </Navbar .Header>
          </Navbar>
        </div>
      );
  }


  render() {
    let textStyle ={fontFamily: "Open Sans", background: "#F7F7F7"};
    return (
      <div style={textStyle}>
          {this.createNavBar()}
          {this.props.children}
          <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans:300');
          </style>
      </div>
    );
  }
}

ControlBar.propTypes = {
  userStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("userStore")(observer(ControlBar));
