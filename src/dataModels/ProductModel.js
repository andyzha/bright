import mongoose, { Schema } from 'mongoose';
import SchemaOptions from './EnableVirtualGetterOption';

const ProductSchema = new Schema({
  name: {type : String, trim : true},
  description: {type : String, trim : true},
  images: [{type : String, trim : true}],
  variants: [{
    sku: {type : String, trim : true},
    price: {type : String},
    type: {type : String},
    inventory: {type : Number, max : 999}
  }],
  createdAt: {type : Date, default : Date.now}
}, SchemaOptions);

//validation
ProductSchema.path('name').required(true, 'Product name is required');
ProductSchema.path('images').required(true, 'Product images is required');

//virtuals

//statics

//method

export default mongoose.model('Product', ProductSchema);