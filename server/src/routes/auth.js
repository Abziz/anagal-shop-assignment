const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const router = express.Router();

const loginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().min(6).max(64).required(),
});

router.post('/login', async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(400).send({ error: error.message });
	}
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
		return res.status(400).send({ error: 'wrong username or password' });
	}
	const token = jwt.sign({
		sub: user._id,
	}, process.env.JWT_SECRET, { expiresIn: 7 * 24 * 60 * 60 * 100 });

	res.send({ token });
});

router.post('/register', async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(400).send({ error: error.message });
	}
	const { username, password } = req.body;
	if (await User.exists({ username })) {
		return res.status(400).send({ error: 'username already taken' });
	}
	try {
		const user = await User.create({
			username,
			passwordHash: bcrypt.hashSync(password, 10),
		});
		const token = jwt.sign({
			sub: user._id,
		}, process.env.JWT_SECRET, { expiresIn: 7 * 24 * 60 * 60 * 100 });
		res.send({ token });
	} catch (err) {
		return res.status(500).send({ error: err.message });
	}
});

module.exports = router;