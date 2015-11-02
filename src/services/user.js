// Fetchr service to load photos for the given feature.
// NOTE: register in server fetchr
import UserModel from '../dataModels/UserModel';
import Mongoose from 'mongoose';

const debug = require("debug")("brightServicesUser");

export default {
  name: "user",

  read(req, resource, { user }, config, done) {
    debug('start user read ');
    req.passport.authenticate('local', {
      // successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/error', // redirect back to the signup page if there is an error
      //failureFlash : true // allow flash messages
    });

    // UserModel.findOne({ email: user.email }, (err, existingUser) => {
    //   if (err) return done(err);

    //   if (!existingUser) return done(new Error('email does not exist'));
    //   req.logIn(existingUser, err => {
    //     debug('login err ' + err);
    //     if (err) return done(err);
    //     done(err, newUser);
    //   });
    // })
  },

  create(req, resource, { user }, body, config, done) {
    UserModel.find({ email: user.email }, (err, existingUsers) => {
      if (err) return done(err);

      if (existingUsers.length > 0) return done(new Error('email already exist'));
      let newUser = new UserModel();
      newUser.provider = 'local';
      newUser.email = user.email;
      newUser.hashedPassword = newUser.generateHash(user.password);
      debug('user ' + JSON.stringify(newUser));

      newUser.save(err => {
        debug('user err ' + JSON.stringify(err));
        if (err) return done(err);
        // req.logIn(newUser, err => {
        //   debug('login err ' + err);
        //   if (err) return done(err);
        //   done(err, newUser);
        // });
        done(null, newUser);
      })
    })
  },

  // update(req, resource, { cartId, item }, body, config, done) {
  //   if(!Mongoose.Types.ObjectId.isValid(cartId)) {
  //     debug('invalid id ' + cartId);
  //     return done(new Error(`invalid cartId: ${cartId}`));
  //   }

  //   CartModel.findById(cartId, (err, cart) => {
  //     if (err) return done(err);
  //     if (!cart) {
  //       // Note: set cart id to be the same as user id for simplification
  //       cart = new CartModel({ _id:cartId, items: []});
  //     }

  //     // remove same item if in cart
  //     cart.items = cart.items.filter(
  //       cartItem => item.productId.toString() != cartItem.productId.toString());
  //     cart.items.push(item);
  //     debug('apply cart ' + cart);
  //     cart.save(err => {
  //       done(err, cart);
  //     });
  //   })
  // },

  // delete(req, resource, { cartId, item }, config, done) {
  //   if(!Mongoose.Types.ObjectId.isValid(cartId)) {
  //     return done(new Error(`invalid cartId: ${cartId}`));
  //   }

  //   CartModel.findById(cartId, (err, cart) => {
  //     if (err) return done(err);
  //     if (!cart) {
  //       done(null);
  //     }

  //     cart.items = cart.items.filter(
  //       cartItem => item.productId.toString() != cartItem.productId.toString());
  //     cart.save(err => {
  //       done(err, cart);
  //     });
  //   })
  // }
};
