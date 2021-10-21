import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { CartProvider } from './contexts/cart';


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

