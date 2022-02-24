/** @format */

import {
	ADD_CART_ITEM,
	EMPTY_CART,
	INIT_CART,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM_AMOUNT,
} from '../constants';

/**
 * Implement cartReducer that handles following cases:
 * 1) INIT_CART: returns the actions payload if there is a payload. Otherwise returns state.
 * 2) ADD_CART_ITEM: Adds a new cart item to the stores state
 * 3) REMOVE_CART_ITEM: removes the product item from the state.
 * 4) UPDATE_CART_ITEM_AMOUNT: Updates the cart item with the amount from payload.
 * 5) EMPTY_CART: returns an empty array.
 * @param {Array} state old state of cart.
 * @param {Object} action the action that calls the reducer.
 * @returns {Array} new state for cart
 */
const cartReducer = (state = [], action) => {
	switch(action.type){
		case INIT_CART:
			return action.payload? action.payload : state

		case ADD_CART_ITEM:
			
			return [...state, action.payload];

		case REMOVE_CART_ITEM:
			
			return state.filter(item => item.product.id !== action.payload.id);
			
		case UPDATE_CART_ITEM_AMOUNT:
			console.log("state rv=", state);
			console.log("action.payload rv= ", action.payload);

			//this way use of array.map, the old state also changed, why? but in this excercise, not check the old state changed or not
			return state.map(item => item.product.id === action.payload.productId
				? {...item, quantity: item.quantity += action.payload.amount} : {...item});

		case EMPTY_CART:
			return [];

		default:
			return state;
	}
};

export default cartReducer;
