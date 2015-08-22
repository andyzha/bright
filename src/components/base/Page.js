import React, { Component, PropTypes } from "react";

import NavBar from "./NavBar";
import Footer from "./Footer";

// if (process.env.BROWSER) {
//   require("../../style/Page.scss");
// }

class Page extends Component {

  static propTypes = {
    footer: PropTypes.bool,
    children: PropTypes.node
  }

  static defaultProps = {
    footer: true
  }

  render() {
    const { footer } = this.props;

    return (
      <div className="Page container-fluid">
        <div className="Page-header">
          <NavBar />
        </div>

        <div className="Page-body">
          { this.props.children }
        </div>

        { footer && <Footer /> }

      </div>
    );
  }

}

export default Page;
