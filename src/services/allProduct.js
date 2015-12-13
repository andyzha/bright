// Fetchr service to load photos for the given feature.
// NOTE: register in server fetchr
import ProductModel from '../dataModels/ProductModel';
const debug = require("debug")("brightservices");

export default {
  name: "allProduct",

  read(req, resource, { }, config, done) {
    debug('list all in service');
    ProductModel.find({},  function(err,  products) {
        var productList = [];

        products.forEach(function(product)  {
            productList.push(product);
        });

        done(null,  productList);
    });
  }

};
