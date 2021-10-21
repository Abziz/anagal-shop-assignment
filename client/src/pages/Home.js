import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";


const HomePage = () => {
	const [products, setProducts] = useState([]);
	const { addToCart } = useContext(CartContext);


	useEffect(() => {
		(async () => {
			const { data } = await axios.get('/products');
			setProducts(data);
		})();
	}, []);

	const onProductAddToCart = useCallback((product) => {
		addToCart(product);
	}, [addToCart]);

	return (
		<div className="flex flex-col gap-3 p-3">
			<div className="grid xs:grid-cols-1 xs:grid-rows-6 sm:grid-cols-2 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-3">
				{products.map((product, i) => <Product key={i} product={product} onClick={onProductAddToCart}></Product>)}
			</div>
		</div >
	);
};


const Product = React.memo(({ product, onClick }) => {
	return (
		<div className="shadow-lg rounded-lg  bg-gray-100 overflow-hidden flex flex-col">
			<img src={product.imageUrl} className="h-64 object-cover w-full" alt='product img' />
			<div className="p-3 flex-auto flex flex-col justify-between">
				<div className="flex justify-between">
					<div className="font-bold">{product.name}</div>
					<div className="text-lg font-semibold">{product.price}$</div>
				</div>
				<div className="italic line-clamp-3 truncate whitespace-pre-line">
					{product.description}
				</div>

				<button className="btn-primary"
					onClick={() => onClick(product)}>
					<FontAwesomeIcon icon="shopping-cart" /> add to cart
				</button>
			</div>
		</div>
	);
});

export default HomePage;