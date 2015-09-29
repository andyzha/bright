// Fetchr service to load photos for the given feature.
// NOTE: register in server fetchr
import ProductModel from '../dataModels/ProductModel';
const debug = require("debug")("brightservices");

export default {
  name: "product",

  read(req, resource, { id }, config, done) {
    // const query = {
    //   id: id
    // };
    // const options = {
    //   locale: req.locale
    // };

    // get(`/photos/${id}`, query, options, done);

    // use mock data
    // var mockProduct = JSON.stringify(
    //   {
    //     id: id,
    //     name: `Light ${id}`,
    //     images: [
    //       'https://drscdn.500px.org/photo/118891291/m%3D900_k%3D1_a%3D1/a0769431cdb930d569e57d301301e6cd',
    //       'https://drscdn.500px.org/photo/119354931/m%3D900_k%3D1_a%3D1/79544c362497e47df23cb29dea640f70',
    //       'https://drscdn.500px.org/photo/119349805/m%3D900_k%3D1_a%3D1/1cb3d9b75b6a01091edb355ec4b7a21d'
    //     ],
    //     description: 'The finest light u can see. Lorem Lorem Lorem',
    //     variants: [
    //       {
    //         sku: '123123',
    //         type: '40oz Bottle',
    //         price: 4.99,
    //         inventory: 1

    //       },
    //       {
    //         sku: '123124',
    //         type: '6 Pack',
    //         price: 12.99,
    //         inventory: 5
    //       },
    //       {
    //         sku: '1231235',
    //         type: '30 Pack',
    //         price: 19.99,
    //         inventory: 3
    //       }
    //     ]
    //   }
    // );

    //debug("product service return" + mockProduct);
    //done(null, mockProduct);


    //TODO: sanitize id
    ProductModel.findById(id, (err, product) => {
      if (err) return done(err);
      // debug('db result: ' + product.id);
      if (!product) return done('no product found for id ' + id);
      done(null, product);
    })
  }

};
