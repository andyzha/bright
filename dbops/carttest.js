import mongoose from 'mongoose';
import CartModel from '../src/dataModels/CartModel';

mongoose.connect('mongodb://192.168.99.100:32768/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  let item = { productId: new mongoose.Types.ObjectId, quantity: 2 };
  let newCart = new CartModel({ _id: '55ebec7fa0c118e9d0095bae', items: [item]});
  // newCart.save().then(console.log('finish saving ' + newCart))
  // .then(
  //   CartModel.findById('55ebec7fa0c118e9d0095bae', (err, cart) => {
  //     if (err) return console.error(err);
  //     // create cart if not
  //     if (!cart) {
  //       console.log('no cart found');
  //     }
  //     console.log(cart);
  //   }));

  newCart.save((err, cart) => {
    CartModel.findById('55ebec7fa0c118e9d0095bae', (err, cart) => {
      if (err) return console.error(err);
      // create cart if not
      if (!cart) {
        console.log('no cart found');
      }
      console.log(cart);
    })
  });

  console.log('script end');
  //throw 'end';

  // CartModel.findById('55ebec7fa0c118e9d0095bae', (err, cart) => {
  //   if (err) return console.error(err);
  //   // create cart if not
  //   if (!cart) {
  //     console.log('no cart found');
  //   }
  //   console.log(cart);
  //   console.log(cart.length);
  //   //if (!cart || cart) return done('no product found for id ' + id);
  // })

  // CartModel.find({ _id: '55ebec7fa0c118e9d0095bae' }, function (err, items) {
  //   if (err) return console.error(err);
  //   console.log(items);
  //   console.log(items.length);
  //   console.log(`pid is ${items[0]._id}`);
  //   // products[0].save( (err, p) => console.log('err: ' + err + ', saved :' + p));
  // })
});
