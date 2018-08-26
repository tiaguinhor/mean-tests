const ObjectId = require('mongoose').Types.ObjectId;
const Category = require('../models/category');
const Product = require('../models/product');

const responseData = (req, res, err, data) => {
  if (!err) res.status(200).send(data);
  else res.status(500).send(err);
};

module.exports = {
  genNewRegisters: (categories) => {
    Category.remove().then(() => {
      for (const cat of categories) {
        Category.create({
          title: cat,
        });
      }
    });
  },

  findAll: (req, res) => {
    Category.find((err, data) => {
      responseData(req, res, err, data);
    });
  },

  findOne: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Category.findById(req.params.id, (err, data) => {
      if (err) return res.status(500).send(err);

      Product.find({ 'category.title': data.title }, (err, products) => {
        responseData(req, res, err, products);
      });
    });
  },

  create: (req, res) => {
    Category.create(req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  update: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Category.updateNew(req.params.id, req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  delete: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Category.findByIdAndRemove(req.params.id, (err, data) => {
      responseData(req, res, err, data);
    });
  },
};
