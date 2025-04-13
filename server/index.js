// 1. Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// 2. Initialize app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());


// 4. Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// 5. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Cutlery Store API');
  });