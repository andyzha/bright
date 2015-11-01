import React, { PropTypes, Component } from "react";
import { Button, Modal, ButtonInput, Input } from 'react-bootstrap';

import UserAction from '../../actions/UserActionCreator';

class Register extends Component {
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

  createUser = () => {
    let user = {
      email: this.refs.emailInput.getValue(),
      password: this.refs.passwordInput.getValue()
    };
    this.context.executeAction(UserAction.createUser, { user:user });
  }

  render() {
    return (
      <li>
        <Button bsStyle="link" onClick={this.openAuthModal}>
        Register
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type="text" ref="emailInput" label="Email" placeholder="Enter Email" />
              <Input type="password" ref="passwordInput" label="Password"
                placeholder="Enter Password" />
              <ButtonInput value="Submit" bsStyle={this.state.style}
                bsSize="large" disabled={this.state.disabled}
                onClick={this.createUser} />
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

export default Register;
