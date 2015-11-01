import React, { Component, PropTypes } from "react";
import { Button, Modal, ButtonInput, Input } from 'react-bootstrap';

import UserAction from '../../actions/UserActionCreator';

class Login extends Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close = () => {
    this.setState({ showModal: false });
  }

  openAuthModal = () => {
    this.setState({ showModal: true });
  }

  login = () => {
    let user = {
      email: this.refs.emailInput.getValue(),
      password: this.refs.passwordInput.getValue()
    };
    this.context.executeAction(UserAction.login, { user:user });
  }

  render() {
    return (
      <li>
        <Button bsStyle="link" onClick={this.openAuthModal}>
        Login
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="/auth/login" method="post" >
              <Input type="text" ref="emailInput" label="Email" name="email" placeholder="Enter Email" />
              <Input type="password" ref="passwordInput" label="Password"
                name="password" placeholder="Enter Password" />
              <ButtonInput type="submit" value="Submit" bsStyle={this.state.style}
                bsSize="large" disabled={this.state.disabled} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }

}

export default Login;
