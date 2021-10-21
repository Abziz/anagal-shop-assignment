const express = require('express');
const { Product } = require('../models');
const router = express.Router();

/** Get products to show on page */
router.get('/', async (req, res) => {
	const { page = 1, limit = 6 } = req.query;
	const products = await Product.find().skip((page - 1) * limit).limit(limit).lean();
	res.send(products);
});

/** Get a specific product */
router.get('/:id}', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id).lean();
	res.send(product);
});


module.exports = router;