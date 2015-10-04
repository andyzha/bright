import React, { PropTypes, Component } from "react";
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { connectToStores } from "fluxible-addons-react";

var debug = require("debug")("brightCart");
import CartAction from '../actions/CartActionCreator';

//TODO switch to user id when available
@connectToStores(["CartStore"], (context, props) =>
  ({ cart: context.getStore("CartStore").get('123456789012345678901234') })
)
class Cart extends Component {
  static propTypes = {
    cart: PropTypes.object
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  deleteItemFromCart(item) {
    debug(`addItemToCart: cartId - ${this.props.cart}; item - ${JSON.stringify(item)}`);
    this.context.executeAction(CartAction.deleteItemFromCart,
      { cartId:this.props.cart.id, item:item });
  }

  render() {
    debug('cart: ' + JSON.stringify(this.props.cart));
    if (!this.props.cart || this.props.cart.items.length < 1)
      return <h4>your cart is empty</h4>;
    const { items } = this.props.cart;

    return (
      <ListGroup>
        <ListGroupItem><h3>Shopping Cart</h3></ListGroupItem>
        { items.map((item) => {
          return (
            <ListGroupItem key={item.productId} header={item.productId}>
              Quantity: {item.quantity}
              <Button bsStyle="link" onClick={this.deleteItemFromCart.bind(this, item)}>
                Remove
              </Button>
            </ListGroupItem>
        )})}
      </ListGroup>
    );
  }
}

export default Cart;