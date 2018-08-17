const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');

const responseData = (req, res, err, data) => {
  if (!err) res.status(200).send(data);
  else res.status(500).send(err);
};

module.exports = {
  findAll: (req, res) => {
    User.find((err, data) => {
      responseData(req, res, null, data);
    });
  },

  findOne: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    User.findById(req.params.id, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  create: (req, res) => {
    User.create(req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  update: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    User.update(req.params.id, req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  delete: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    User.findByIdAndRemove(req.params.id, (err, data) => {
      responseData(req, res, err, data);
    });
  },
};
