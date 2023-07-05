const User = require("../models/userModel");

/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = async (req, res) => {
  let user = new User(req.body);
  await user
    .save()
    .then((user) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/users/?id=${user.id}`,
      });
      res.json(user);
    })
    .catch((err) => {
      res.status(422);
      console.log("error while saving the user", err);
      res.json({
        error: "There was an error saving the user",
      });
    });
};

/**
 * Get all users or one
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
  // if an specific user is required
  let email = req.query.email;
  if (req.query && email) {
    User.findOne({email})
      .populate("users")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      });
  } else {
    // get all users
    User.find()
      .populate("users")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(422);
        res.json({ error: err });
      });
  }
};

module.exports = {
  userPost,
  userGet,
};
