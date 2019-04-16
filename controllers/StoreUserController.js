
const User = require('../database/models/User');

module.exports = (req,res)=>{

    User.create(req.body,(err,doc)=>{
        if(err){
           const registrationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
           req.flash('registrationErrors',registrationErrors);
           req.flash('data',req.body)
          return   res.redirect('/Register')
        }
          res.redirect('/');
    })
    
}