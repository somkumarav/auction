const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/addproduct', async (req, res) => {
  console.log('hello');
  try {
    const { name, description, price, category, image } = req.body;
    const product = await pool.query(
      'INSERT INTO product (name, description, baseprice, currentprice, category, image) VALUES ($1, $2, $3,  $3, $4, $5) RETURNING *',
      [name, description, price, category, image]
    );
    res.json({ status: 'success', data: product.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.json({ status: 'error', message: err.message });
  }
});

router.get('/allproducts', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM product');
    res.json({ status: 'success', data: products.rows });
  } catch (err) {
    console.error(err.message);
    res.json({ status: 'error', message: err.message });
  }
});

module.exports = router;
