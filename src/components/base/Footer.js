import React, { Component } from "react";
// import { NavLink } from "fluxible-router";

// if (process.env.BROWSER) {
//   require("../../style/Footer.scss");
// }

class Footer extends Component {

  render() {
    let footerStyle = {
      margin: '5em 0'
    };

    return (
      <footer style={footerStyle}>
        <div className="row">
          <div className="col-lg-12">
            <div className="Footer-disclaimer">
              Test Footer-disclaimer.
            </div>
            <div>
              <strong>Bright</strong> is demo app built in <a href="https://facebook.github.io/react/">React</a> with <a href="http://www.fluxible.io">Fluxible</a>.
            </div>
          </div>
        </div>
      </footer>
    );
  }

}

export default Footer;
