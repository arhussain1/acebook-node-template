const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    // should have a method that checks already exists
    const user = new User(req.body);
    userExists(user)
    if (userExists(user) === false) {
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    } else {
      // should flash an error message back to the user
      res.redirect("/users/new");
      console.log('Error goes here')
    }
  },

  
};

const userExists = (user) => {
// we need check the mongo db and see if this user exists
  if (User.find({email: user.email})) {
    console.log('This user exists already');
    return true;
  } else {
    return false;
  }
}
module.exports = UsersController;
