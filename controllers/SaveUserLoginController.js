
const User =require('../database/models/User');
const bcrypt = require('bcrypt');


module.exports =  (req,res)=>{

    const {email , password} = req.body;
     
     User.findOne({email},(err,user)=>{
         
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
              if (same) {
                req.session.userId = user._id
                res.redirect('/')
              } else {
                res.redirect('/Login')
              }
            })
          } else { 
            return res.redirect('/Login')
          }
        })


   
}