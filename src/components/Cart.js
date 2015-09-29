import React, { PropTypes, Component } from "react";
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connectToStores } from "fluxible-addons-react";

var debug = require("debug")("brightCart");
// import { loadProduct } from "../actions/ProductActionCreator";

//TODO switch to user id when available
@connectToStores(["CartStore"], (context, props) =>
  ({ cart: context.getStore("CartStore").get('123456789012345678901234') })
)
class Cart extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  render() {
    if (!this.props.cart) {
      return (<p>no item in cart</p>);
    }

    debug('cart: ' + this.props.cart);
    const { items } = this.props.cart;

    return (
      <Col lg={6} md={8}>
        <p className="cartHeader">cart</p>
        { items.map((item, index) => {
          return (
            <p>{item}</p>
        )})}
      </Col>
    );
  }
}

export default Cart;