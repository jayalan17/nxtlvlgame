import React from 'react';
import { inject, observer } from 'mobx-react';
import { browserHistory, Link } from 'react-router';
import { Well, Form, FormControl,
  FormGroup, ControlLabel, Button } from 'react-bootstrap';

class NewUser extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleNewUser(event) {
    event.preventDefault();
    this.NewUser(this.state);
  }

  NewUser(usr) {
    this.props.userStore.newUserCreated = true;
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: usr.name,
        password: usr.password,
      })
    })
    .then(function(){
      browserHistory.push('/Welcome');
    });
  }

  render() {
    this.props.userStore.failedLogin = false;
    this.props.userStore.newUserCreated = false;
    this.props.userStore.userAlreadyExists = false;
    const bg = require('../img/background4.png');
    const parentStyle = {height:"100vh", width:"100vw",
      background: "url("+bg+") no-repeat center fixed", backgroundSize: "cover"};
    const wellStyle = {float: "right", margin: "20px", opacity: ".95",
      backgroundBlendMode: "overlay", height: "105px", width: "825px", border: "1px solid #ea1828"};
    const wellStyle2 = {float: "left", margin: "20px",
      opacity: ".95", backgroundBlendMode: "overlay",
      height: "125px", width: "300px", textAlign: "center", border: "1px solid #ea1828"};
    const button = {width: "125px"}

    return (
      <div>
        <Well style={wellStyle2}>
          <div>
            <img style={{height: "80px", width: "225px", border: "2px solid #ea1828"}} src={require('../img/NextLVL.png')}/>
          </div>
        </Well>
        <div style={parentStyle}>
          <Well style={wellStyle} bsSize="large">
            <Form inline>
              <ControlLabel style={{fontSize: "17px"}}>Create new Player...&nbsp;&nbsp;</ControlLabel>
              <FormGroup controlId="formInlineName">
                <FormControl
                  onChange={this.handleNameChange}
                  type="text" placeholder="username" />
                <FormControl
                  onChange={this.handlePasswordChange}
                  type="password" placeholder="password"/>
              </FormGroup>
              <Button
                onClick={this.handleNewUser}
                type="submit" className="btn btn-danger" style={button}>Create User
              </Button>
              <Link to="/Welcome">
                <Button
                  type="submit"
                  className="btn btn-danger" style={button}>Return to Login
                </Button>
              </Link>
            </Form>
          </Well>
        </div>
      </div>
    );
  }
}

NewUser.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(NewUser));
