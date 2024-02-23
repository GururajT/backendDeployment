const mongoose=require('mongoose')

const postScheme= new mongoose.Schema({
    title:{
        name:String,
    },
    description:{
        name:String,
    }
});

const Post=mongoose.model('Post',postScheme)

module.exports=Post;