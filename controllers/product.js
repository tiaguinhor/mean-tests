const ObjectId = require('mongoose').Types.ObjectId;
const faker = require('faker');
const Product = require('../models/product');
const Category = require('../models/category');

const responseData = (req, res, err, data) => {
  if (!err) res.status(200).send(data);
  else res.status(500).send(err);
};

module.exports = {
  genNewRegisters: (req, res) => {
    Product.remove().then(() => {
      Category.find((err, data) => {
        if (err) return res.status(500).send(err);

        for (let i = 0; i < 10; i++) {
          const category = data[Math.floor(Math.random() * data.length)];

          const product = new Product({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            category,
            description: faker.lorem.paragraph(),
            image: faker.image.fashion(),
          });

          product.save();
        }
      });
    });
  },

  pagination: (req, res) => {
    const perPage = 3;
    const page = parseInt(req.query.page) || 0;
    let pages = 0;
    let currentPage = 1;
    const nextUrl = '';
    const prevUrl = '';
    Product.countDocuments().exec((err, count) => {
      Product.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, products) => {
          pages = Math.ceil(count / perPage);
          if (page === 0) {
            currentPage = page + 1;
            res.json({
              products,
              currentPage,
              pages,
              count,
              prevUrl: `?page=${pages - 1}`,
              nextUrl: `?page=${currentPage}`,
            });
          } else if (page === pages - 1) {
            currentPage = pages;
            res.json({
              products,
              currentPage,
              pages,
              count,
              prevUrl: `?page=${page - 1}`,
              nextUrl: '?page=0',
            });
          } else {
            currentPage = page + 1;
            res.json({
              products,
              currentPage,
              pages,
              count,
              prevUrl: `?page=${page - 1}`,
              nextUrl: `?page=${currentPage}`,
            });
          }
        });
    });
  },

  findAll: (req, res) => {
    Product.find((err, data) => {
      responseData(req, res, err, data);
    });
  },

  findOne: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Product.findById(req.params.id, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  create: (req, res) => {
    Product.create(req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  update: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Product.updateNew(req.params.id, req.body, (err, data) => {
      responseData(req, res, err, data);
    });
  },

  delete: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send(`No record with this id: ${req.params.id}`);
    }

    Product.findByIdAndRemove(req.params.id, (err, data) => {
      responseData(req, res, err, data);
    });
  },
};
