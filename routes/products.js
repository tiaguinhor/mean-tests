const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/product');

router.get('/', ProductController.findAll);
router.post('/', ProductController.create);
router.get('/:id', ProductController.findOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

router.get('/api/pagination', ProductController.pagination);
router.get('/api/genNewRegisters', async (req, res) => {
  try {
    await ProductController.genNewRegisters(req, res);
  } catch (err) {
    res.status(500).send(err);
  }

  res.status(200).send('Inserted Successfully');
});

module.exports = router;
