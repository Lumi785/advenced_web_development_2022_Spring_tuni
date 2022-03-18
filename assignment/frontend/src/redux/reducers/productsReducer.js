/** @format */

import { bindActionCreators } from 'redux';
import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT,
} from '../constants';

/**
 * Implement productsReducer that handles following cases:
 * 1) GET_PRODUCT: adds the single product to an empty state.
 * 2) GET_PRODUCTS: Adds the products to the empty state
 * 3) ADD_PRODUCT: Adds the product as the first entry of the state.
 * 4) UPDATE_PRODUCT: Updates the order in the state and places it as its last entry.
 * 5) DELETE_PRODUCT: Deletes the product from the array.
 * @param {Array} state old state of products.
 * @param {object} action the action that calls the reducer.
 * @returns {Array} new state for products
 */
const productsReducer = (state = [], action) => {
	//console.log("products reducer called ... action.type = ", action.type);
	
	switch(action.type){
		case ADD_PRODUCT:
			// console.log("action = ", action.payload)
			// console.log("state = ", state);

			//this way add the new product in front, so in UI new product will be shown the top 
			// return [...state, action.payload] will add to the end of the array
			
			if ([...state].find(prod => prod.id === action.payload.id)){
				console.log("product already in state", action.payload.id);
				return state;
			} 
			return [action.payload, ...state];
			
			
		case DELETE_PRODUCT:
			return state.filter(product => product.id !== action.payload.id);
		case GET_PRODUCT:
			
			return [action.payload];
		case GET_PRODUCTS:
			return state = action.payload;
		case UPDATE_PRODUCT:
			
			// console.log("action.payload = ", action.payload);
			// console.log("state = ", state);
			return state.map(product => product.id === action.payload.id ? action.payload : product);
			
		default:
			return state;
	}
};

export default productsReducer;
