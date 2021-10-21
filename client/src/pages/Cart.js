import { useContext, useMemo } from "react";
import { CartContext } from "../contexts/cart";


const CartPage = () => {
	const { items } = useContext(CartContext);
	const total = useMemo(() => {
		return items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
	}, [items]);
	return (
		<>
			{items.length === 0 && (
				<div className="text-2xl my-auto text-gray-500 font-bold text-center"> No items in cart...</div>
			)}
			<div className="flex flex-col gap-3 p-3">
				{items?.map((item) => (
					<div key={item.product._id} className="bg-gray-100 shadow flex overflow-hidden rounded-lg">
						<img src={item.product.imageUrl} alt="product name" className="object-cover w-32" />
						<div className="flex-auto p-3 flex flex-col">
							<div className="font-bold">{item.product.name}</div>
							<div> {item.product.description}</div>
						</div>
						<div class="flex flex-col gap-3 p-3 text-right font-bold">
							<div>{item.product.price}$</div>
							<div>&times; {item.quantity}</div>
							<div className="border-b border-gray-500 h-1px"> </div>
							<div> {item.product.price * item.quantity}$</div>
						</div>
					</div>
				))}
				<div className="flex justify-between items-center">
					<div className="uppercase text-2xl p-3">
						TOTAL: {total.toFixed(2)}$
					</div>
					<div>
						<button className="btn-primary"> Buy now </button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartPage;