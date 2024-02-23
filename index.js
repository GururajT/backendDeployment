const express=require('express')
const Post=require('./models/Post')
const db=require('./config/db')
const app=express()

const port=process.env.PORT|| 3000;

app.use(express.json());
app.get('/api',(req,res)=>{
    res.json({Message: 'hello world'})
})
app.get('/api/post',(req,res)=>{
    Post.find({}).then((data)=>{
        console.log(data);
        res.status(200).json({data})
    }).catch((err)=>{
        console.log('error is occured')
        res.status(500).json({message:"err"})
    })
})
app.get('/api/post/:id',(req,res)=>{
    let postid=req.params.id
    Post.find({_id:postid}).then((data)=>{
        console.log(data);
        res.status(200).json({data})
    }).catch((err)=>{
        console.log('error is occured')
        res.status(500).json({message:"err"})
    })
})
app.post('/api/posts/',(req,res)=>{
    let newPost= new Post({
        title: req.body.title,
        description: req.body.description
    })
    console.log(newPost)
    newPost.save().then((data) => {
        // console.log(data);
        res.status(200).json({message:'successfully post created',data: data}) 
    }).catch((err) => {
        // console.log('error is occured')
        res.status(500).json({message:"err"})
    });
})
app.put('api/post/:id',(req,res)=>{
    let postid=req.params.id;

    let newInfo={
        title:req.body.title,
        description:req.body.description
    }
    Post.findByIdAndUpdate(postid,newInfo).then((data) => {
        res.status(200).json({message:'successfully post created', data: data}) 
    }).catch((err) => {
        res.status(500).json({message:"err"})
    });
})
app.delete('api/post/:id',(req,res)=>{
    let postid=req.params.id;

    let newInfo={
        title:req.body.title,
        description:req.body.description
    }
    Post.findByIdAndDelete(postid).then((data) => {
        res.status(200).json({message:'successfully post created', data: data}) 
    }).catch((err) => {
        res.status(500).json({message:"err"})
    });
})  
db().then((result) => {
    console.log('successfully connected to db')
}).catch((err) => {
    console.log('error occured')
});

app.listen(port,(err)=>{
    if(!err){
        console.log(`server is up and running at ${port}`)
    }
})