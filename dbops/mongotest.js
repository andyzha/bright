import mongoose from 'mongoose';
import ProductModel from '../src/dataModels/ProductModel'
import DisplayProduct from '../src/dataModels/DisplayProductModel'

mongoose.connect('mongodb://192.168.99.100:27017/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  //test product model
   let product1 = new ProductModel({
     name: 'demoProduct1',
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
   let product1Id = product1._id;

   let product2 = new ProductModel({
     name: 'demoProduct2',
     description: 'GSW product description.',
     images: [
       'http://44d5i01rkpt329p8yqqf89h5.wpengine.netdna-cdn.com/wp-content/uploads/2015/05/Golden-State-Warriors-1.jpg',
       'http://www.ozwallpaper.com/wp-content/uploads/2015/04/nba_playoffs_golden_state_warriors_wallpapers_hd.png'
     ],
     variants: [
       {
         sku: '123125',
         type: '6 Pack',
         price: 12.99,
         inventory: 5
       }]
   });

   console.log(product2);

   product2.save((err, product2) => {
     if (err) return console.error(err);
     console.log(`${product2.name} saved`);
   })
   let product2Id = product2._id;

   let product3 = new ProductModel({
     name: 'demoProduct3',
     description: 'CLE product description.',
     images: [
       'http://posterizes.com/wp-content/uploads/cleveland-cavaliers-logo-wallpaper-1024x768.jpg',
       'http://img.bleacherreport.net/img/images/photos/003/226/973/6b6402449c6d0918e975020386434270_crop_north.jpg?w=630&h=420&q=75'
     ],
     variants: [
       {
         sku: '123126',
         type: '6 Pack',
         price: 12.99,
         inventory: 5
       }]
   });

   console.log(product3);

   product3.save((err, product3) => {
     if (err) return console.error(err);
     console.log(`${product3.name} saved`);
   })
   let product3Id = product3._id;

   let displayProduct1Primary = new DisplayProduct({
    productId: product1Id,
    image: 'https://drscdn.500px.org/photo/118891291/m%3D900_k%3D1_a%3D1/a0769431cdb930d569e57d301301e6cd',
    isPrimary: true
   });

   displayProduct1Primary.save((err, displayProduct1Primary) => {
     if (err) return console.error(err);
     console.log(`display saved`);
   })

   let displayProduct2Primary = new DisplayProduct({
    productId: product2Id,
    image: 'http://www.ozwallpaper.com/wp-content/uploads/2015/04/nba_playoffs_golden_state_warriors_wallpapers_hd.png',
    isPrimary: true
   });

   displayProduct2Primary.save((err, displayProduct2Primary) => {
     if (err) return console.error(err);
     console.log(`display saved`);
   })


   let displayProduct1NotPrimary = new DisplayProduct({
    productId: product1Id,
    image: 'https://drscdn.500px.org/photo/119354931/m%3D900_k%3D1_a%3D1/79544c362497e47df23cb29dea640f70',
    isPrimary: false
   });

   displayProduct1NotPrimary.save((err, displayProduct1NotPrimary) => {
     if (err) return console.error(err);
     console.log(`display saved`);
   })

   let displayProduct2NotPrimary = new DisplayProduct({
    productId: product2Id,
    image: 'http://44d5i01rkpt329p8yqqf89h5.wpengine.netdna-cdn.com/wp-content/uploads/2015/05/Golden-State-Warriors-1.jpg',
    isPrimary: false
   });

   displayProduct2NotPrimary.save((err, displayProduct2NotPrimary) => {
     if (err) return console.error(err);
     console.log(`display saved`);
   })


});

