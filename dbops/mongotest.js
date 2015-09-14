import mongoose from 'mongoose';
import ProductModel from '../src/dataModels/ProductModel'

mongoose.connect('mongodb://192.168.99.100:32768/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // var kittySchema = mongoose.Schema({
  //   name: String
  // });

  // var Kitten = mongoose.model('Kitten', kittySchema);

  // var silence = new Kitten({ name: 'Silence' });
  // console.log(silence); // 'Silence'

  // var fluffy = new Kitten({ name: 'fluffy' });

  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //   console.log(`${fluffy.name} saved`);
  //   //fluffy.speak();
  // });

  // Kitten.find(function (err, kittens) {
  //   if (err) return console.error(err);
  //   console.log(kittens);
  // })

  // Kitten.find({ name: /^fluff/ }, (err, kittens)=>{
  //   if (err) return console.error(err);
  //   console.log(kittens)
  // });

  //test product model
  let product1 = new ProductModel({
    name: 'demoProduct2',
    description: 'This is a <p>demo</p> product description.',
    images: [
      'https://drscdn.500px.org/photo/118891291/m%3D900_k%3D1_a%3D1/a0769431cdb930d569e57d301301e6cd',
      'https://drscdn.500px.org/photo/119354931/m%3D900_k%3D1_a%3D1/79544c362497e47df23cb29dea640f70'
    ],
    variants: [
      {
        sku: '123124',
        type: '6 Pack',
        price: 12.99,
        inventory: 5
      }]
  });

  console.log(product1);

  product1.save((err, product1) => {
    if (err) return console.error(err);
    console.log(`${product1.name} saved`);
  })

  ProductModel.find(function (err, products) {
    if (err) return console.error(err);
    console.log(products);
    console.log(`pid is ${products[0]._id}`);
    // products[0].save( (err, p) => console.log('err: ' + err + ', saved :' + p));
  })
});

