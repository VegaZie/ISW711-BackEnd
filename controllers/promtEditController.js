require("dotenv").config();

const Promt = require("../models/promtEditModel");

/**
 * Creates a promt
 *
 * @param {*} req
 * @param {*} res
 */
const promtEditPost = async (req, res) => {
  let promt = new Promt(req.body);
  await promt
    .save()
    .then((promt) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/promt/?id=${promt.id}`,
      });
      res.json(promt);
    })
    .catch((err) => {
      res.status(422);
      res.json({
        error: "There was an error saving the promt",
      });
    });
};

/**
 * Get all promts or one
 *
 * @param {*} req
 * @param {*} res
 */
const promtEditGet = (req, res) => {
  // if an specific promt is required
  let id = req.query.id;
  if (req.query && id) {
    Promt.findOne({ id })
      .populate("promt")
      .then((promt) => {
        res.json(promt);
      })
      .catch((err) => {
        res.status(404);
        res.json({ error: "Promt doesnt exist" });
      });
  } else {
    // get all promts
    Promt.find()
      .populate("promt")
      .then((promts) => {
        res.json(promts);
      })
      .catch((err) => {
        res.status(422);
        res.json({ error: err });
      });
  }
};

/**
 * Patch promt
 *
 * @param {*} req
 * @param {*} res
 */

const promtEditPatch = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndUpdate(req.query.id, req.body, function (err, course) {
      if (err) {
        res.status(404);
        res.json({ error: "Promt doesnt exist" });
      } else {
        res.status(200); // OK
        res.json(course);
      }
    });
  }
};

/**
 * Delete promt
 *
 * @param {*} req
 * @param {*} res
 */

const promtEditDelete = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        res.json({ error: "Promt doesnt exist" });
      }
      if (err) {
        res.status(422);
        res.json({
          error: "There was an error deleting the promt",
        });
      }
      res.status(204);
      res.json({});
    });
  } else {
    res.status(404);
    res.json({ error: "Promt doesnt exist" });
  }
};

module.exports = {
  promtEditDelete,
  promtEditGet,
  promtEditPatch,
  promtEditPost,
};
