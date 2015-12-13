import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";

var debug = require("debug")("brightstore-home");

class HometStore extends BaseStore {

  static sotreName = "HomeStore";

  static handlers = {
    [ActionNames.LOAD_Display_Product_SUCCESS]: "handleLoadDisplayProductSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.displayProductMap = {};
  }

  handleLoadDisplayProductSuccess(displayProductMap) {
    debug('display products: ' + JSON.stringify(displayProductMap));

    this.displayProductMap = displayProductMap;
    this.emitChange();
  }

  get() {
    debug('return display products from the store' + JSON.stringify(this.displayProductMap));
    return this.displayProductMap;
  }

  dehydrate() {
    return {
      displayProductMap: this.displayProductMap
    };
  }

  rehydrate(state) {
    this.displayProductMap = state.displayProductMap;
  }
}

  export default HometStore;
