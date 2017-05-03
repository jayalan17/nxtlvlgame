/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavItem, Nav, Glyphicon, } from 'react-bootstrap';
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
    if(this.props.userStore.loggedInUser){
      return (
        <div>
          <Navbar staticTop collapseOnSelect fluid>
            <Navbar .Header>
              <Navbar .Brand>
                <Link className= "lgo" to={{pathname: '/Dashboard'}}>
                  <img className="hidden-xs"
                    src={require('../img/NextLVL.png')}
                    width="200px" height="50px"/>
                </Link>
                <Link className= "lgo" to={{pathname: '/Dashboard'}}>
                  <img className="hidden-md hidden-lg hidden-sm"
                    src={require('../img/NextLVL.png')}
                    width="200px"
                    height="50px"/>
                </Link>
              </Navbar .Brand>
            </Navbar .Header>
            <Navbar .Collapse>
              <Nav pullRight>
                <LinkContainer to={{pathname: '/Dashboard'}}>
                  <NavItem>
                    <Glyphicon glyph="user"/> {this.props.userStore.name}
                  </NavItem>
                </LinkContainer>
                <NavItem
                  onClick={() => {this.logOutHandler();}}>log out
                </NavItem>
              </Nav>
            </Navbar .Collapse>
          </Navbar>
        </div>
      );
    }
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
