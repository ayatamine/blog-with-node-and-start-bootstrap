module.exports = (req,res)=>{
    console.log("cokie",req.session);
   if(req.session.userId){
          
         return res.render('create');
   }
  res.redirect('/Login')  
}