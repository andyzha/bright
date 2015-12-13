import ActionNames from "../constants/ActionNames";
var debug = require("debug")("brightManageProductAction");

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

const ManageProductActionCreator = {
 
  loadProduct(context, { isPrimary }, done) {
    debug("load display product with " + isPrimary);

    context.service.read("displayProduct", { isPrimary }, { timeout:  TIMEOUT },
       (err, data) => {
         if (err) {
           debug ('load display data error');
           return done(err);
         }
         debug ("return display data");
         context.dispatch(ActionNames.LOAD_Display_Product_SUCCESS, data);
         done();
       }
    );
  },

  addProductToDisplay(context, { productId, image, isPrimary }, done) {
    debug("add display product " + isPrimary + " id is " + productId + " image is " + image);

    context.service.create("displayProduct", { productId, image, isPrimary }, { timeout:  TIMEOUT },
       (err, data) => {
         if (err) {
           debug ('add display data error');
           return done(err);
         }
         debug ("add display data");
         context.dispatch(ActionNames.LOAD_Display_Product_SUCCESS, data);
         done();
       }
    );
  }
}