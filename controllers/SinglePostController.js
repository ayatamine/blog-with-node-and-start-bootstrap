const Post = require('../database/models/Post');
module.exports = async function(req,res){
    const post = await Post.findById(req.params.id).populate('author');
    res.render('post',{post});
  }