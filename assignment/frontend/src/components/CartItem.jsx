/** @format */

import React from 'react';
import { useDispatch } from 'react-redux';
import {
	decrementCartItem,
	incrementCartItem,
	removeCartItem,
} from '../redux/actionCreators/cartActions';

const CartItem = ({ item }) => {
	
	const dispatch = useDispatch();

	function handleIncrement(){
		dispatch(incrementCartItem(item.product.id));
	}

	function handleDecrement(){
		if (item.quantity === 1){
			dispatch(decrementCartItem(item.product.id));
			
			dispatch(removeCartItem(item.product));
			return;
		}
	
		dispatch(decrementCartItem(item.product.id));
	}

	return(
		<ol data-testid='cart-item-component'>
			<ul data-testid={item.product.id}>
				<div data-testid='item-name'>{item.product.name}</div>
				<div data-testid='item-price'>{item.product.price}</div>
				<div data-testid='item-amount'>{item.quantity}</div>
				<button 
					data-testid={`plus-btn-${item.product.id}`}
					onClick={
						(e) => {
							e.preventDefault();
							handleIncrement();
						}

					}
					>+
				</button>

				<button 
					data-testid={`minus-btn-${item.product.id}`}
					onClick={
						(e) => {
							e.preventDefault();
							handleDecrement();
						}

					}
					>-
				</button>
			</ul>
		</ol>
	);
};

export default CartItem;
