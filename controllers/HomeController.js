const Post = require('../database/models/Post');
module.exports = async (req,res) =>{
    const posts =await Post.find({}).populate('author');
    console.log(req.session);
    
    res.render('home',{posts,userId:req.session.userId});
    
}