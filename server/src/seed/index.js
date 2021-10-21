require('dotenv').config();
const { Product } = require('../models');
const products = require('./products.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, (err) => {
	if (err) return console.error(err);
	console.log("connected to db")
});
async function seed() {

	await Product.deleteMany({});
	await Product.create(products);
}

seed().then(() => {
	console.log('seed complete')
	return mongoose.disconnect();
});
