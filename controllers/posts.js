const Post = require("../models/post");
const moment = require("moment");

const PostsController = {
  Index: (req, res) => {
    Post.find({}).sort({date: -1}).exec((err, posts) => {
      if (err) {
        throw err;
      }
        console.log(posts)
      posts.forEach(post => post.date = moment(parseInt(post.date)).format('LLLL'));
        console.log(posts)

      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {session: req.session});
  },
  Create: (req, res) => {
    const data = {
      message: req.body.message,
      email: req.session.user.email,
      profPic: req.session.user.url,
      userName: req.session.user.name,
      imageUrl: req.body.imageUrl
    }

    console.log(`Checking for image URL: ${data}`)

    const post = new Post(data);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  UpdateComment: (req, res) => {
    const comment = req.body.comment;
    const post_id = req.body.id;

    Post.updateOne(
      {'_id': post_id}, // filter - how to find post
      { $push: { comments: comment}}, // update - what to update
      (err, doc) => { // last but not least a callback because nothing works without a callback
        if (err) {
          throw err;
        }
        res.status(201).send(doc)
      });
  },

  UpdateLikes: (req, res) => {    
    const email = req.session.user.email
    Post.findByIdAndUpdate( req.body.id, {
      $inc:{"likes.total":1}, $push:{"likes.who": email}
    } ).exec((err, doc) => {


      if (err) {
        throw err;
      }
      else {
        res.status(201).send(doc)
      }
      //redirect back to the previous page 
    })
  }

};
module.exports = PostsController;