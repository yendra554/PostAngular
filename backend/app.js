const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();

mongoose.connect("mongodb+srv://bheem:x3Ba3tZ5jArPIVUX@cluster0.6cpyi.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {

  console.log('Connected to database!');
})

.catch(() => {

  console.log('Connection failed!');
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : false }));

app.use((req,res,next) =>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type , Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next()
});



app.post("/api/posts",(req, res, next)=>{
  const post =new Post({
    title: req.body.title,
    content: req.body.content
  });

post.save().then( createdPost => {

  res.status(201).json({

    message: "Post added Successfully",

    postId : createdPost._id
  });

   });

});


app.get("/api/posts",(req , res, next) => {

  Post.find().then(documents => {

    res.status(200).json({

      message: "Post fetched successfully!",
      posts: documents

    });

  });

});


app.delete("/api/posts/:id", (req , res, next) => {

  Post.deleteOne({ _id: req.params.id}).then(result => {
     console.log(result);
     res.status(200).json({ message: "Post deleted successfully" });
  });


});

module.exports = app;
