import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";

var debug = require("debug")("brightstoreCart");

class CartStore extends BaseStore {

  static storeName = "CartStore"

  static handlers = {
    [ActionNames.LOAD_Cart_SUCCESS]: "handleLoadCartSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.cart = {};
  }

  handleLoadCartSuccess(cart) {
    debug('cart in store: ' + JSON.stringify(cart));

    this.cart[cart.id] = cart;
    this.emitChange();
  }

  get(id) {
    debug("return cart from store for " + id + ": " + this.cart[id]);
    return this.cart[id];
  }

  dehydrate() {
    return {
      cart: this.cart
    };
  }

  rehydrate(state) {
    this.cart = state.cart;
  }

}


export default CartStore;
