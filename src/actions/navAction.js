// Actions to run when the router matches a route. Used in app/routes.js

import { loadProduct } from "../actions/ProductActionCreator";
import { loadAllProduct } from "../actions/ProductActionCreator";
import { loadDisplayProduct } from "../actions/ProductActionCreator";

var debug = require("debug")("brightNav");

const NavActions = {

  // getUserPage(context, route, done) {
  //   const feature = route.getIn(["params", "id"]);
  //   context.executeAction(loadProduct, { id }, done);
  // },

  getProduct(context, route, done) {
    const id = route.getIn(["params", "id"]);
    context.executeAction(loadProduct, { id }, done);
  },

  getAllProducts(context, route, done) {
    context.executeAction(loadAllProduct, { }, done);
  },

  getDisplayProducts(context, route, done) {
    context.executeAction(loadDisplayProduct, { }, done);
  },

  // do not load something, just send an error in the callback
  // to show how the app react with errors
  getErrorPage(context, route, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};

export default NavActions;
