const express = require('express');

const router = express.Router();
const CategoryController = require('../controllers/category');

router.get('/', CategoryController.findAll);
router.post('/', CategoryController.create);
router.get('/:id', CategoryController.findOne);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

router.get('/api/genNewRegisters', async (req, res) => {
  const categories = ['Baby', 'Movies', 'Shoes', 'Books', 'Electronics', 'Computers', 'Kids'];

  try {
    await CategoryController.genNewRegisters(categories);
  } catch (err) {
    res.status(500).send(err);
  }

  res.redirect('/products/api/genNewRegisters');
});

module.exports = router;
