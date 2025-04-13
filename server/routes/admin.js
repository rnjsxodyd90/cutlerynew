const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFile = path.join(__dirname, '../data/cutlery.json');

router.post('/add-product', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price || !newProduct.image) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  fs.readFile(productsFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read products file' });

    const products = JSON.parse(data);

    const newId = `cutlery${Date.now()}`; // generate a simple unique ID
    const productToSave = { id: newId, ...newProduct };

    products.push(productToSave);

    fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save product' });

      res.status(201).json({ success: true, product: productToSave });
    });
  });
});

module.exports = router;
