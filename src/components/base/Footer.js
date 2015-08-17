import React, { Component } from "react";
import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  require("../../style/Footer.scss");
}

class Footer extends Component {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-disclaimer">
          Test Data.
        </div>
        <div>
          <strong>Bright</strong> is demo app built in <a href="https://facebook.github.io/react/">React</a> with <a href="http://www.fluxible.io">Fluxible</a>.
        </div>
      </div>
    );
  }

}

export default Footer;
