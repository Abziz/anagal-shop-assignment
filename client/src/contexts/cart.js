import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";



export const CartContext = createContext({});

const CART_LOCAL_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }) => {

	const { user } = useContext(AuthContext);
	const [items, setItems] = useState(() => {
		if (user) {
			return user.cart;
		}
		const fromStorage = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
		if (fromStorage) {
			return JSON.parse(fromStorage);
		}
		return [];
	});

	useEffect(() => {
		(async () => {
			if (!user) {
				localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(items));
			}
		})();
	}, [items, user])

	useEffect(() => {
		if (user) {
			setItems(user.cart);
		}
	}, [user]);




	const addToCart = useCallback(async (product) => {
		setItems(oldItems => {
			const items = [...oldItems];
			const itemIndex = items.findIndex(item => item.product._id === product._id);
			if (itemIndex === -1) {
				items.push({
					product,
					quantity: 1
				})
			} else {
				const { quantity } = items[itemIndex];
				items[itemIndex] = { ...items[itemIndex], quantity: quantity + 1 };
			}
			return items;
		});
	}, []);

	return (
		<CartContext.Provider value={{ items, addToCart }}>
			{children}
		</CartContext.Provider>
	);

}