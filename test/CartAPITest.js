// var assert = require("assert");
import mongoose from 'mongoose';

import config from "../src/configs/config";
import CartService from '../src/services/cart.js';

var should = require('should');

// This test requires the db in unitTestConfig to be running
describe('Cart API', () => {
  beforeEach(done => {
    if (mongoose.connection.db) return done();
    console.log(`using: ${config.db}`);
    mongoose.connect(config.db, done);
  });

  // after(done => {
  //   mongoose.connection.collections['carts'].drop( err => {
  //     console.log('collection dropped');
  //     done(err);
  //   });
  // });

  let cartId = (new mongoose.Types.ObjectId).toString();
  let pid1 = (new mongoose.Types.ObjectId);
  let item1 = { productId: pid1, quantity: 2 };
  describe('#update()', () => {
    it('should create the cart if no existing one', done => {

      CartService.update(null, null,
        { id: cartId, item: item1 }, null,
        (err, cart) => {
          if(err) return done(err);
          should.exist(cart);
          should.exist(cart.items);
          cart.id.should.equal(cartId);
          cart.items[0].productId.should.equal(pid1);
          cart.items[0].quantity.should.equal(2);
          done();
        });
    });

    it('should add item to cart if cart exists', done => {
      let pid = (new mongoose.Types.ObjectId);
      let item = { productId: pid, quantity: 3 };
      CartService.update(null, null,
        { id: cartId, item }, null,
        (err, cart) => {
          if(err) return done(err);
          should.exist(cart);
          should.exist(cart.items);
          cart.id.should.equal(cartId);
          cart.items.should.have.length(2);
          done();
        });
    });
  });

  describe('#read()', () => {
    it('should return nothing', done => {
      CartService.read(null, null,
        { id: (new mongoose.Types.ObjectId).toString() }, null,
        (err, cart) => {
          if(err) return done(err);
          should.not.exist(cart);
          done();
        });
    });

    it('should return cart with 2 items', done => {
      CartService.read(null, null,
        { id: cartId }, null,
        (err, cart) => {
          if(err) return done(err);
          should.exist(cart);
          should.exist(cart.items);
          cart.id.should.equal(cartId);
          cart.items.should.have.length(2);
          done();
        });
    });
  });

  describe('#delete()', () => {
    // it('should return nothing', done => {
    //   CartService.read(null, null,
    //     { id: (new mongoose.Types.ObjectId).toString() }, null,
    //     (err, cart) => {
    //       if(err) return done(err);
    //       should.not.exist(cart);
    //       done();
    //     });
    // });

    it('should delete one item from the cart', done => {
      CartService.delete(null, null,
        { id: cartId, item: item1 }, null,
        (err, cart) => {
          if(err) return done(err);
          should.exist(cart);
          should.exist(cart.items);
          cart.id.should.equal(cartId);
          cart.items.should.have.length(1);
          //cart.items[0].should.not.equal(item1);
          done();
        });
    });
  });
});
