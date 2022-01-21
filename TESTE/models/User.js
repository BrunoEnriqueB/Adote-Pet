import pkg from 'mongoose';
const {Schema} = pkg;
import mongoose from 'mongoose';


const User = mongoose.model(
  'User', 
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true
    }
  }, {timestamps: true})
)

export default User;