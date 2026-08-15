const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Saare products fetch karna (Filter aur Search ke sath)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Naya Product Upload karna
router.post('/upload', async (req, res) => {
  try {
    const { title, description, price, discountPrice, category, stock, images, sellerName } = req.body;
    
    const newProduct = new Product({
      title,
      description,
      price,
      discountPrice,
      category,
      stock,
      images,
      sellerName
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ 
      message: "Product uploaded successfully to Market Plus!", 
      product: savedProduct 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Single Product Details fetch karna
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

