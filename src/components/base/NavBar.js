import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { Navbar, Nav } from 'react-bootstrap';
// import { DropdownButton, MenuItem } from 'react-bootstrap';

import NavItem from "./NavItem";
// import Logo from "./Logo";

// import features from "../constants/features";
// import LocaleSwitcher from "./LocaleSwitcher";
// import { FormattedMessage } from "../utils/IntlComponents";

// if (process.env.BROWSER) {
//   require("../../style/NavBar.scss");
// }

@connectToStores([], (context) =>
  ({ route: context.getStore("RouteStore").getCurrentRoute() })
)
class NavBar extends Component {

  static PropTypes = {
    route: PropTypes.object.isRequired
  }

  render() {
    const { route } = this.props;
    const currentFeature = route ? route.getIn(["params", "feature"]) : null;
    return (
      <Navbar brand='Bright-Prototype' toggleNavKey={0}>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem
            eventKey={1}
            key="home"
            routeName="home"
            navParams={{feature: currentFeature}}>
            Home
          </NavItem>
          <NavItem
            eventKey={2}
            key="about"
            routeName="about"
            navParams={{feature: currentFeature}}>
            About
          </NavItem>
          <NavItem
            eventKey={3}
            key="demoproduct"
            routeName="product"
            navParams={{id: 1}}>
            Demo Product
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

}

export default NavBar;
