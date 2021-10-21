const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	cart: [{
		product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
		quantity: {
			type: Number,
			required: true,
			min: 1,
			validate: Number.isInteger
		},
		created: { type: Date, default: Date.now }
	}],
	created: { type: Date, default: Date.now },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
