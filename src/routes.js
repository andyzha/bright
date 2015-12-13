import React from "react";

import About from "./components/About";
import Home from "./components/Home";
//import User from "./components/User";
import ProductDetail from "./components/product/ProductDetail";
import ManageProduct from "./components/ManageProductPage";

import NavActions from "./actions/navAction";

export default {

  home: {
    path: "/",
    method: "get",
    handler: Home,
    action: NavActions.getDisplayProducts
  },

  about: {
    path: "/about",
    method: "get",
    handler: About
  },

  // user: {
  //   path: "/user/:id",
  //   method: "get",
  //   handler: User,
  //   action: NavActions.getUserPage
  // },

  product: {
    path: "/product/:id",
    method: "get",
    handler: ProductDetail,
    action: NavActions.getProduct
  },

  manageproduct: {
    path: "/manageproduct",
    method: "get",
    handler: ManageProduct,
    action: NavActions.getAllProducts
  }, 
  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  error: {
    path: "/error",
    method: "get",
    action: NavActions.getError
  }

};
