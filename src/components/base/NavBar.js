import React, { PropTypes, Component } from "react";
// import { connectToStores } from "fluxible-addons-react";
import { Navbar, Nav } from 'react-bootstrap';
// import { DropdownButton, MenuItem } from 'react-bootstrap';

import NavItem from './NavItem';
import Login from './Login';
import Register from './Register';
// import Logo from "./Logo";

// import UserStore from '../../stores/UserStore';
// import features from "../constants/features";
// import LocaleSwitcher from "./LocaleSwitcher";
// import { FormattedMessage } from "../utils/IntlComponents";

// if (process.env.BROWSER) {
//   require("../../style/NavBar.scss");
// }

// @connectToStores([UserStore], context =>
//   ({ // route: context.getStore("RouteStore").getCurrentRoute(),
//     user: context.getStore(UserStore).get() })
// )
class NavBar extends Component {

  static PropTypes = {
    // route: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <Navbar brand='Bright-Prototype' toggleNavKey={0}>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem
            eventKey={1}
            key="home"
            routeName="home"
            navParams={{}}>
            Home
          </NavItem>
          <NavItem
            eventKey={2}
            key="about"
            routeName="about"
            navParams={{}}>
            About
          </NavItem>
          <NavItem
            eventKey={3}
            key="demoproduct"
            routeName="product"
            navParams={{id: '55ebec7fa0c118e9d0095bae'}}>
            Demo Product
          </NavItem>
          <Login />
          <Register />
        </Nav>
      </Navbar>
    );
  }

}

export default NavBar;
