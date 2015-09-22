// Fetchr service to load photos for the given feature.
import CartModel from '../dataModels/CartModel';
import Mongoose from 'mongoose';

// const debug = require("debug")("brightservicesCart");

export default {
  name: "cart",

  read(req, resource, { id }, config, done) {
    if(!Mongoose.Types.ObjectId.isValid(id)) {
      return done(new Error(`invalid id: ${id}`));
    }

    CartModel.findById(id, (err, cart) => {
      if (err) return done(err);
      done(null, cart);
    })
  },

  update(req, resource, { id, item }, config, done) {
    if(!Mongoose.Types.ObjectId.isValid(id)) {
      return done(new Error(`invalid id: ${id}`));
    }

    CartModel.findById(id, (err, cart) => {
      if (err) return done(err);
      if (!cart) {
        // Note: set cart id to be the same as user id for simplification
        cart = new CartModel({ _id:id, items: []});
      }

      cart.items.push(item);
      cart.save(err => {
        done(err, cart);
      });
    })
  },

  delete(req, resource, { id, item }, config, done) {
    if(!Mongoose.Types.ObjectId.isValid(id)) {
      return done(new Error(`invalid id: ${id}`));
    }

    CartModel.findById(id, (err, cart) => {
      if (err) return done(err);
      if (!cart) {
        done(null);
      }

      cart.items.filter(
        cartItem => item.productId.toString() != cartItem.productId.toString());
      console.log(cart.items);
      cart.save(err => {
        done(err, cart);
      });
    })
  }
};
