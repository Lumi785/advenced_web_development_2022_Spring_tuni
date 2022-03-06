/** @format */

// CART ACTION CREATORS
import {
	ADD_CART_ITEM,
	EMPTY_CART,
	INIT_CART,
	NEW_NOTIFICATION,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM_AMOUNT,
} from '../constants';

const cartMsg = {
	add: 'New cart item added.',
	update: 'Cart item amount updated.',
};
/**
 * @description Action creator that initiates the cart after page is refreshed.  Dispatches an INIT_CART-type action along with pre-existing cart-items stored locally as payload to the frontends redux-stores product-state.
 * @return {Object} action
 */
export const initCart = () => {
	const cartItems = localStorage.getItem("cart");
	//console.log("cartItems = ", cartItems);
	return ({
		type: INIT_CART,
		payload: cartItems
	})
};



/**
 * @description Action creator that adds a new cart item to local storage.  Dispatches an ADD_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION action to the frontends notification-state with a succesful message using cartMsg.add
 * @param {String} product - The product item to add
 * @@return {Function} thunk
 */
export const addCartItem = (product) => {
	
	return async(dispatch) => {

		const jsonOldCartItems = localStorage.getItem('cart');
		let objOldCartItems = JSON.parse(jsonOldCartItems);
		const newObjOldCartItems = [...objOldCartItems, product];

		//this directly add to loacalStorage
		localStorage.setItem('cart', newObjOldCartItems);

		//this is for reducer to add to store state
		dispatch({type: ADD_CART_ITEM, payload: product});
		dispatch({type: NEW_NOTIFICATION, payload: {message: cartMsg.add, isSuccess: true}})
	}
	
};



/**
 * @description Action creator that removes a cart item from local storage.  Dispatches a REMOVE_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state.
 * @param {String} product - The product item to remove from cart
 * @return {Object} Action
 */
export const removeCartItem = (product) => {
	return async(dispatch) => {

		const oldCartItems = localStorage.getItem('cart');

		//oldCartItems is an array of jsons, convert it to an array of objects
		const oldCartItemsObjects = JSON.parse(oldCartItems);

		const newnewCartItemsObjects = oldCartItemsObjects.filter(item => item.product.id !== product.id);
		
		// update localStorage
		localStorage.setItem('cart', newnewCartItemsObjects);
		
		// send action to reducer to update store state
		dispatch({type: REMOVE_CART_ITEM, payload: product});
	}
};



/**
 * @description Thunk action creator that increments a cart items quantity in local store.  Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details { productId, amount: 1 } as payload to the frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update).
 * @param {String} productId - The cart item id to increment
 * @return {Function} thunk
 */
export const incrementCartItem = (productId) => {
	console.log("increment Car Item functon from cartActions called .....");

	return async(dispatch) => {
		const oldCartItems = localStorage.getItem('cart');
		const oldCartItemsObjects = JSON.parse(oldCartItems);
		//console.log("oldCartItemsObjects = ", oldCartItemsObjects);


		const newCartItemsObjects = oldCartItemsObjects.map(item => 
			item.product.id === productId 
			? {...item, quantity: item.quantity += 1}: item
		);

		//console.log("newCartItemsObjects = ", newCartItemsObjects);



		//update localStorage
		localStorage.setItem('cart', newCartItemsObjects);

		//send action to reducer to update store state
		dispatch({type: UPDATE_CART_ITEM_AMOUNT, payload: {productId, amount: 1 }});
		dispatch({type: NEW_NOTIFICATION, payload: {message: cartMsg.update, isSuccess: true}});
	}
};



/**
 * @description Thunk action creator that decrements (reduces) a cart items quantity in local store.  Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details  { productId, amount: -1 } as payload to the frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update)
 *
 * @param {String} productId - The cart item id to decrement
 * @return {Function} thunk
 */
export const decrementCartItem = (productId) => {
	return async(dispatch) => {
		const oldCartItems = localStorage.getItem('cart');
		const oldCartItemsObjects = JSON.parse(oldCartItems);

		const newnewCartItemsObjects = oldCartItemsObjects.map(item => 
			

			item.product.id === productId ? 
				(item.quantity > 0 ? item.quantity -= 1 : item.quantity += 1)
				: item.quantity
		)

		//update localStorage
		localStorage.setItem('cart', newnewCartItemsObjects);

		//send action to reducer to update store state
		dispatch({type: UPDATE_CART_ITEM_AMOUNT, payload: {productId, amount: -1 }});
		dispatch({type: NEW_NOTIFICATION, payload: {message: cartMsg.update, isSuccess: true}});
	}
};



/**
 * @description An action creator which removes the entire cart-item from local store. Returns an action with EMPTY_CART-type to remove cart all items.
 * @returns {Object} the action
 */
export const emptyCart = () => {
	return({
		type: EMPTY_CART
	})
};
