// Fetchr service to load photos for the given feature.
// NOTE: register in server fetchr
import DisplayProductModel from '../dataModels/DisplayProductModel';
const debug = require("debug")("brightservices-displayProduct");

export default {
  name: "displayProduct",

  read(req, resource, { isPrimary }, config, done) {
    debug('list all displayed stuff');
    DisplayProductModel.find({}, function(err,  results) {
      var products = {};
      var primaryProducts = [];
      var unPrimaryProducts = [];

      results.forEach(function(product) {
        if (product.isPrimary == true) {
          primaryProducts.push(product);
        } else {
          unPrimaryProducts.push(product);
        }
      });
      products[true] = primaryProducts;
      products[false] = unPrimaryProducts;
      done(null,  products);
    });
  },

  create(req, resource, { productId, image, isPrimary }, config, done) {
    debug('create new display product');
    let newDisplayProduct = new DisplayProductModel();
    newDisplayProduct.productId = productId;
    newDisplayProduct.image = image;
    newDisplayProduct.isPrimary = isPrimary;

    debug('displayProduct ' + JSON.stringify(newDisplayProduct));

    newDisplayProduct.save(err => {
       debug('newDisplayProduct err ' + JSON.stringify(err));
       if (err) return done(err);
       done(null, newDisplayProduct);
     })
  }
};
