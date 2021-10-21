const express = require('express');
const middleware = require('../middleware');
const router = express.Router();
const { User } = require('../models');

/** Get current cart for user */
router.get('/', middleware.jwt, async (req, res) => {
	const user = await User.findById(req.user.sub, 'cart').lean();
	if (!user) {
		res.sendStatus(401);
	}
	res.send(user.cart);
});

/** Add product to cart */
router.post('/add', middleware.jwt, async (req, res) => {
	const { productId } = req.body;
	if (!productId) {
		return res.status(400).send({ error: '"productId" is required' });
	}
	console.log('HEREE');
	res.send({ ok: true });
});

module.exports = router;