require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI, (err) => {
	if (err) return console.error(err);
	console.log('connected to db');
});
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', routes.auth);
app.use('/products', routes.products);
app.use('/cart', routes.cart);
app.listen(port, () => console.log(`server is running on port ${port}`));
