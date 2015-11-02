import { BaseStore } from "fluxible/addons";
import ActionNames from "../constants/ActionNames";

var debug = require("debug")("brightUserStore");
// import _ from "lodash";

/*
*/

class UserStore extends BaseStore {

  static storeName = "UserStore"

  static handlers = {
    [ActionNames.HandleServiceRenderUser]: "handleServiceRenderUser"
  }

  constructor(dispatcher) {
    super(dispatcher);
    // this.user = {};
    debug('new user store');
  }

  handleServiceRenderUser(user) {
    debug('user in store: ' + JSON.stringify(user));

    this.user = user;
    this.emitChange();
  }

  get() {
    debug("return user from store: " + this.user);
    return this.user;
  }

  dehydrate() {
    return {
      user: this.user
    };
  }

  rehydrate(state) {
    this.user = state.user;
  }

}


export default UserStore;
