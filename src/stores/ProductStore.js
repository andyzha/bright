import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";

var debug = require("debug")("brightstore");
// import _ from "lodash";

/*
*/

class ProductStore extends BaseStore {

  static storeName = "ProductStore"

  static handlers = {
    [ActionNames.LOAD_Product_SUCCESS]: "handleLoadProductSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.product = {};
  }

  handleLoadProductSuccess(product) {
    debug('product in store id - ' + product.name + ' : ' + product);
    this.product[product.id] = product;
    this.emitChange();
  }

  get(id) {
    debug("return product from store for " + id + ": " + this.product[id]);
    return this.product[id];
  }

  dehydrate() {
    return {
      product: this.product
    };
  }

  rehydrate(state) {
    this.product = state.product;
  }

}


export default ProductStore;
