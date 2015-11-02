// Fetchr service to load photos for the given feature.
// NOTE: register in server fetchr
import CartModel from '../dataModels/CartModel';
import Mongoose from 'mongoose';

const debug = require("debug")("brightservicesCart");

export default {
  name: "cart",

  read(req, resource, { cartId }, config, done) {
    if (!Mongoose.Types.ObjectId.isValid(cartId)) {
      return done(new Error(`invalid cartId: ${cartId}`));
    }

    debug('Is auth ' + req.isAuthenticated());
    if (!req.isAuthenticated()) {
      return done(null, {})
    }

    CartModel.findById(cartId, (err, cart) => {
      if (err) return done(err);
      done(null, cart);
    })
  },

  update(req, resource, { cartId, item }, body, config, done) {
    if(!Mongoose.Types.ObjectId.isValid(cartId)) {
      debug('invalid id ' + cartId);
      return done(new Error(`invalid cartId: ${cartId}`));
    }

    if (!req.isAuthenticated()) {
      return done(null, {})
    }

    CartModel.findById(cartId, (err, cart) => {
      if (err) return done(err);
      if (!cart) {
        // Note: set cart id to be the same as user id for simplification
        cart = new CartModel({ _id:cartId, items: []});
      }

      // remove same item if in cart
      cart.items = cart.items.filter(
        cartItem => item.productId.toString() != cartItem.productId.toString());
      cart.items.push(item);
      debug('apply cart ' + cart);
      cart.save(err => {
        done(err, cart);
      });
    })
  },

  delete(req, resource, { cartId, item }, config, done) {
    if(!Mongoose.Types.ObjectId.isValid(cartId)) {
      return done(new Error(`invalid cartId: ${cartId}`));
    }

    if (!req.isAuthenticated()) {
      return done(null, {})
    }

    CartModel.findById(cartId, (err, cart) => {
      if (err) return done(err);
      if (!cart) {
        done(null);
      }

      cart.items = cart.items.filter(
        cartItem => item.productId.toString() != cartItem.productId.toString());
      cart.save(err => {
        done(err, cart);
      });
    })
  }
};
