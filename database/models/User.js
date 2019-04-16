const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const UserSchema = mongoose.Schema({
    username :{
        type :String,
        required :[true,"please provide your username"]
    },
    email :{
        type :String,
        required:[true,"please provide your email"],
        unique : true
    },
    password :{
        type :String,
        required :[true,"please provide your password"]
    }
}) ;

UserSchema.pre('save',function(next){
  const user = this;
  bcrypt.hash(user.password, 10,function(err, encrypted){
      user.password = encrypted;
      next();
  });
})

module.exports = mongoose.model('User',UserSchema);