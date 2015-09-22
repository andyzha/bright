import mongoose, { Schema } from 'mongoose';
import SchemaOptions from './EnableVirtualGetterOption';

// Note: set cart id to be the same as user id for simplification
const CartSchema = new Schema({
  items: [{
    productId: Schema.Types.ObjectId,
    quantity: {type : Number, max : 99999}
  }],
  createdAt: {type : Date, default : Date.now}
}, SchemaOptions);

//validation

//virtuals

//statics

//method

export default mongoose.model('Cart', CartSchema);