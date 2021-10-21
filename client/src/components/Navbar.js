import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/cart';
import './Navbar.css';
const Navbar = () => {
	const context = useContext(CartContext);

	const itemCount = useMemo(() => context.items.reduce((sum, curr) => sum + curr.quantity, 0), [context]);

	return (
		<nav className="bg-gray-300 shadow-sm">
			<div className="container max-w-screen-lg mx-auto flex flex-row items-center justify-between px-3 gap-3 text-2xl">
				<div></div>
				<Link to="/">
					<div className="font-bold fancy-font whitespace-nowrap">Anagal Shop</div>
				</Link>
				<div className="flex items-center gap-3">
					<Link to="/auth">
						<div>
							<FontAwesomeIcon icon='sign-in-alt' />
						</div>
					</Link>
					<Link to="/cart">
						<div className="relative m-3">
							<FontAwesomeIcon icon='shopping-cart' />

							{context.items?.length > 0 &&
								<span className="absolute top-0 right-0 inline-flex
								 				 items-center justify-center px-2 py-1 text-xs font-bold
												 leading-none text-red-100 transform translate-x-1/2 
												 translate-y-1/2 bg-red-600 rounded-full">
									{itemCount}
								</span>
							}
						</div>
					</Link>
				</div>
			</div>
		</nav>

	);
};

export default Navbar;