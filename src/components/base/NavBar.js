import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import Logo from "./Logo";

// import features from "../constants/features";
// import LocaleSwitcher from "./LocaleSwitcher";
// import { FormattedMessage } from "../utils/IntlComponents";

if (process.env.BROWSER) {
  require("../../style/NavBar.scss");
}

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
    const className = "NavBar-link";
    return (
      <div className="NavBar">
        <div className="NavBar-title">
          <NavLink href="/">
            <Logo />
          </NavLink>
        </div>
        <div className="NavBar-links">
          <NavLink
            key="home"
            className={className}
            routeName="home"
            navParams={{feature: currentFeature}}>
            home
          </NavLink>
          <NavLink
            key="about"
            className={className}
            routeName="about"
            navParams={{feature: currentFeature}}>
            about
          </NavLink>
        </div>
      </div>
    );
  }

}

export default NavBar;
