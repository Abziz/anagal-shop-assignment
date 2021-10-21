const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
	stock: {
		type: Number,
		validate: {
			validator: Number.isInteger,
		},
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
