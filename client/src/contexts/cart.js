import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from './auth';



export const CartContext = createContext({});

const CART_LOCAL_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }) => {

	const { user } = useContext(AuthContext);

	/** cart state, if a user exists take the cart from there otherwise check localstorage */
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

	/**  save items to localstorage if there's no user */
	useEffect(() => {
		(async () => {
			if (!user) {
				localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(items));
			}
		})();
	}, [items, user]);

	/** if user is changed, use his cart */
	useEffect(() => {
		if (user) {
			setItems(user.cart);
		}
	}, [user]);



	/** add to cart function  - TODO: call api if a user is authenticated */
	const addToCart = useCallback((product) => {
		setItems(oldItems => {
			const items = [...oldItems];
			const itemIndex = items.findIndex(item => item.product._id === product._id);
			if (itemIndex === -1) {
				items.push({
					product,
					quantity: 1
				});
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

};