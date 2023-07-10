const User = require("../models/userModel");

/**
 * Post user
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

/**
 * Patch user
 *
 * @param {*} req
 * @param {*} res
 */

const userPatch = (req, res) => {
  if (req.query && req.query.id) {
    Course.findByIdAndUpdate(req.query.id, req.body, function (err, course) {
      if (err) {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      } else {
        res.status(200); // OK
        res.json(course);
      }
    });
  }
};

/**
 * Delete user
 *
 * @param {*} req
 * @param {*} res
 */

const userDelete = (req, res) => {
  if (req.query && req.query.id) {
    Course.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      }
      if (err) {
        res.status(422);
        console.log('error while deleting the user', err)
        res.json({
          error: 'There was an error deleting the user'
        });
      }
      res.status(204);
      res.json({});
    });
  } else {
    res.status(404);
    res.json({ error: "User doesnt exist" });
  }
};


module.exports = {
  userPost,
  userGet,
  userPatch,
  userDelete
};