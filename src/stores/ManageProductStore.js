import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";

var debug = require("debug")("brightstore-manageproduct");

class ManageProductStore extends BaseStore {

  static sotreName = "ManageProductStore";

  static handlers = {
    [ActionNames.LOAD_All_Product_SUCCESS]: "handleLoadAllProductSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.productList = [];
  }

  handleLoadAllProductSuccess(productList) {
    debug('all products: ' + JSON.stringify(productList));

    this.productList = productList;
    this.emitChange();
  }

  get() {
    debug('return all products from the store');
    return this.productList;
  }

  dehydrate() {
    return {
      productList: this.productList
    };
  }

  rehydrate(state) {
    this.productList = state.productList;
  }
}

  export default ManageProductStore;
