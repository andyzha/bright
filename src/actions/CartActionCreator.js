import ActionNames from "../constants/ActionNames";
var debug = require("debug")("brightActionCart");

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const CartActionCreator = {

  loadCart(context, { cartId }, done) {

    context.service.read("cart", { cartId }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("cart return data: " + data);
        context.dispatch(ActionNames.LOAD_Cart_SUCCESS, data);
        done();
      }
    );
  },

  addItemToCart(context, { cartId, item }, done) {

    context.service.update("cart", { cartId, item }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("cart return data: " + data);
        context.dispatch(ActionNames.LOAD_Cart_SUCCESS, data);
        done();
      }
    );
  },

  deleteItemFromCart(context, { cartId, item }, done) {

    context.service.delete("cart", { cartId, item }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("cart return data: " + data);
        context.dispatch(ActionNames.LOAD_Cart_SUCCESS, data);
        done();
      }
    );
  }

};

export default CartActionCreator;
