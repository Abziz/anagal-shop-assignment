import React, { createContext, useCallback, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const TOKEN_KEY = 'jwt-token';

// Attach JWT to outgoing requests
axios.interceptors.request.use(config => {
	const token = localStorage.getItem(TOKEN_KEY);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
	// jwt token is saved to localstorage - not used in ui
	const [user, setUser] = useState(() => {
		const token = localStorage.getItem(TOKEN_KEY);
		if (!token) {
			return null;
		}
		return jwt.decode(token);
	});
	/** Register function - not used due to lack of time */
	const register = useCallback(async (username, password) => {
		const { data } = await axios.post('/auth/register', { username, password });
		localStorage.setItem(TOKEN_KEY, data.token);
		const user = jwt.decode(data.token);
		setUser(user);
		return user;
	}, []);

	/** Register function - not used due to lack of time */
	const login = useCallback(async (username, password) => {
		const { data } = await axios.post('/auth/login', { username, password });
		localStorage.setItem(TOKEN_KEY, data.token);
		const user = jwt.decode(data.token);
		setUser(user);
		return user;
	}, []);
	/** sign out function - not used due to lack of time */
	const signout = useCallback(() => {
		localStorage.removeItem(TOKEN_KEY);
		axios.defaults.headers.Authorization = undefined;
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider value={{
			user,
			register,
			login,
			signout
		}}>
			{children}
		</AuthContext.Provider>
	);

};