require("dotenv").config();

const Promt = require("../models/promtModel");

/**
 * Crea un nuevo registro de promtCompletions (completado de prompts) en la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtCompletionsPost = async (req, res) => {
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
        error: "Hubo un error al guardar el promt",
      });
    });
};

/**
 * Obtiene todos los registros de promtCompletions (completado de prompts) almacenados en la base de datos.
 * También puede obtener un solo registro si se proporciona un ID específico en la consulta.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtCompletionsGet = (req, res) => {
  // Si se requiere un promt específico
  let id = req.query.id;
  if (req.query && id) {
    Promt.findOne({ id })
      .populate("promt")
      .then((promt) => {
        res.json(promt);
      })
      .catch((err) => {
        res.status(404);
        res.json({ error: "El promt no existe" });
      });
  } else {
    // Obtiene todos los promts
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
 * Actualiza un registro de promtCompletions (completado de prompts) en la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtCompletionsPatch = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndUpdate(req.query.id, req.body, function (err, promt) {
      if (err) {
        res.status(404);
        res.json({ error: "El promt no existe" });
      } else {
        res.status(200); // OK
        res.json(promt);
      }
    });
  }
};

/**
 * Elimina un registro de promtCompletions (completado de prompts) de la base de datos.
 *
 * @param {*} req - Objeto de solicitud de Express.
 * @param {*} res - Objeto de respuesta de Express.
 */
const promtCompletionsDelete = (req, res) => {
  if (req.query && req.query.id) {
    Promt.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        res.json({ error: "El promt no existe" });
      }
      if (err) {
        res.status(422);
        res.json({
          error: "Hubo un error al eliminar el promt",
        });
      }
      res.status(204); // No Content
      res.json({});
    });
  } else {
    res.status(404);
    res.json({ error: "El promt no existe" });
  }
};

module.exports = {
  promtCompletionsDelete,
  promtCompletionsGet,
  promtCompletionsPatch,
  promtCompletionsPost,
};
