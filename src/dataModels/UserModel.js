import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import SchemaOptions from './EnableVirtualGetterOption';

const UserSchema = new Schema({
  email: {type : String, trim : true}, //TODO add index to mongo
  // username: [{type : String, trim : true}],
  name: {type : String, trim : true, default: ''},
  provider: { type: String, default: '' },
  hashedPassword: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  facebook: {},
  google: {}
}, SchemaOptions);

//validation
UserSchema.path('email').required(true, 'User email is required');

//virtuals

//statics

//method
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

export default mongoose.model('User', UserSchema);