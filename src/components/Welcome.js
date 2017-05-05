import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { Well, Button, Form, FormGroup,
  ControlLabel, FormControl } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import './style/Welcome.css';

class Welcome extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.loginNotice = this.loginNotice.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleLoginUser(e) {
    e.preventDefault();
    this.props.userStore.LoginUser(this.state.name, this.state.password);
  }

  loginNotice() {
    if(this.props.userStore.failedLogin){
      return (<h5 style={{color: "red"}}>
      Incorrect username or password.  Please try again</h5>);}
    else if(this.props.userStore.newUserCreated){
      return (<h5 style={{color: "green"}}>
      New User Created! Feel free to login</h5>);}
    else if(this.props.userStore.userAlreadyExists){
      return (<h5 style={{color: "red"}}>
      Username taken... Please sign up with a different name</h5>);}
  }

  render() {
    const bg = require('../img/background4.png');
    const parentStyle = {height:"100vh", width:"100vw",
      background: "url("+bg+") no-repeat center fixed",
      backgroundSize: "cover"};
    const wellStyle = {float: "right", margin: "20px",
      opacity: ".95", backgroundBlendMode: "overlay",
      height: "105px", width: "825px", border: "1px solid #ea1828"};
    const wellStyle2 = {float: "left", margin: "20px",
      opacity: ".95", backgroundBlendMode: "overlay",
      height: "410px", width: "300px", textAlign: "center", border: "1px solid #ea1828"};
    const button = {width: "125px"};

    return (
      <div>
        <Well style={wellStyle2}>
          <div>
            <img style={{height: "80px", width: "225px", border: "2px solid #ea1828"}} src={require('../img/NextLVL.png')}/>
          </div>
          <div><Leaderboard/></div>
        </Well>
        <div style={parentStyle}>
        <div>
          <Well style={wellStyle} bsSize="large">
            <Form inline>
              {this.loginNotice()}
              <FormGroup controlId="formInlineName">
                <ControlLabel style={{fontSize: "17px"}}>Advance to NxtLvl...&nbsp;&nbsp;</ControlLabel>
                <FormControl
                  onChange={this.handleNameChange}
                  type="text"
                  placeholder="username"/>
                <FormControl
                  onChange={this.handlePasswordChange}
                  type="password"
                  placeholder="password"/>
              </FormGroup>
              <Link to="/Welcome">
                <Button
                  onClick={this.handleLoginUser}
                  type="submit"
                  className="btn btn-danger" style={button}>Begin Game
                </Button>
              </Link>
              <Link to="/NewUser">
                <Button
                  type="submit"
                  className="btn btn-danger" style={button}>Create New User
                </Button>
              </Link>
            </Form>
          </Well>
          </div>
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Welcome));
