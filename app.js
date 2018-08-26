const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')('PRIVT_KEY');
const mongoose = require('./config/database');
const routesUsers = require('./routes/users');
const routesCategories = require('./routes/categories');
const routesProducts = require('./routes/products');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/users', routesUsers);
app.use('/categories', routesCategories);
app.use('/products', routesProducts);

app.use('/seeder', (req, res) => {
  res.redirect('/categories/api/genNewRegisters');
});

app.post('/charge', (req, res, next) => {
  let amount = req.body.total * 100;

  stripe.customers
    .create({
      email: req.body.stripeToken.email,
      source: req.body.stripeToken.id, //source == stripeToken.id not just stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Ecommerce Shopping Cart',
        currency: 'usd',
        customer: customer.id,
      }),
    )
    .then(charge => res.json(req.body.stripeToken));
});

module.exports = app;
