const Post =require('../database/models/Post');
const path =require('path')

module.exports = (req,res)=>{
    let {image} = req.files;
   
    image.mv(path.resolve(__dirname,'..','public/posts',image.name),(err)=>{
     Post.create({
       ...req.body,
       author :req.session.userId,
       image : `/posts/${image.name}`
      },(err,doc)=>{
        res.redirect('/');
    }); 
    })
}