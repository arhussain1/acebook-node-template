const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: {type: String, default: Date.now},
  comments: {type: Array, default: []},
  email: {type: String},
  profPic: {type: String, default: 'https://drive.google.com/uc?export=view&id=1al2UBXc-gaPMpop8z_WQR3lAWsuEBrYR'},
  userName: String,
  likes: {
    total: {type: Number, default: 0},
    who: {type: Array, default: []},
  },
  imageUrl: {type: String, default: ""}
});
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
