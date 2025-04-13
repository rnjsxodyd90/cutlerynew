// 1. Import dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/products');

// 2. Initialize app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// 4. Routes
app.use('/api/products', productRoutes);

// 5. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Cutlery Store API');
  });