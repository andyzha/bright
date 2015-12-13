import mongoose, { Schema } from 'mongoose';
import SchemaOptions from './EnableVirtualGetterOption';

const DisplayProdcutSchema = new Schema({
  productId: {type : String, trim : true},
  image: {type : String, trim : true},
  isPrimary: {type:Boolean, defualt: false},
  createdAt: {type : Date, default : Date.now}
}, SchemaOptions);

//validation
DisplayProdcutSchema.path('productId').required(true, 'Product Id is required');
DisplayProdcutSchema.path('image').required(true, 'Product image is required');

//virtuals

//statics

//method

export default mongoose.model('DisplayProduct', DisplayProdcutSchema);