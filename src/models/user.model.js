const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, 'The name of the user is required'],
       minlength: 2,
       trim: true
   },
   username: {
       type: String,
       trim: true,
       required: [true, 'The username is required.']
   },
   password: {
       type: String,
       trim: true,
       required: [true, 'The password is required.'],
       minlength: 4,
       validate(value) {
           if(value.toLowerCase().includes('password')) throw new Error('The password cannot be "password".');
       }
   },
   email: {
       type: String,
       trim: true,
       required: [true, 'The email is required'],
       unique: true,
       lowercase: true,
       validate(value) {
           if(!validator.isEmail(value)) throw new Error('Must be a valid email.');
       }
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;