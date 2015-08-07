import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";
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
    this.product = product;
    this.emitChange();
  }

  get() {
    return this.product;
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
