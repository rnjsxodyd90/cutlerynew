const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ordersFile = path.join(__dirname, '../data/orders.json');

router.post('/', (req, res) => {
  const orderData = req.body;

  if (!orderData || !orderData.customer || !orderData.items) {
    return res.status(400).json({ error: 'Incomplete order data' });
  }

  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...orderData
  };

  fs.readFile(ordersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read orders file' });

    const orders = JSON.parse(data);
    orders.push(newOrder);

    fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save order' });

      res.status(201).json({ success: true, orderId: newOrder.id });
    });
  });
});

module.exports = router;
