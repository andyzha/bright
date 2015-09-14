import ActionNames from "../constants/ActionNames";
var debug = require("debug")("brightAction");

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const ProductActionCreator = {

  loadProduct(context, { id }, done) {
    // var data = {"name":"Product" + id, "id":id };
    // debug("return data" + JSON.stringify(data));
    // context.dispatch(ActionNames.LOAD_Product_SUCCESS, data);
    // done();

    context.service.read("product", { id }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        debug("return data" + data);
        context.dispatch(ActionNames.LOAD_Product_SUCCESS, data);
        done();
      }
    );

    // context.service.read("product", { id }, { timeout: TIMEOUT })
    //   .then((err, data) => {
    //     if (err) {
    //       return done(err);
    //     }

    //     debug("return data" + JSON.stringify(data));
    //     context.dispatch(ActionNames.LOAD_Product_SUCCESS, data.product);
    //     done();
    //   }
    // );
  }

};

export default ProductActionCreator;
