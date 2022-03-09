/** @format */

// ORDER ACTION CREATORS

import {
	NEW_NOTIFICATION,
	GET_ORDERS,
	ADD_ORDER,
	GET_ORDER,
	EMPTY_CART, //jh added on 22.02.22, because the test need this, the test not use imported emptyCart function
} from '../constants';
import { emptyCart } from './cartActions';

const orderMsg = {
	newOrder: 'New order made.',
};
/**
 * @description Action creator for getting a single order. Dispatches action with type GET_ORDER and payload of the fetched order if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {string} orderId -  The id of the order to get
 * @return {Function} - Thunk -> action
 */
export const getOrder = (orderId) => {
	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}

		await fetch('/api/orders/'+ orderId, reqOptions)
			.then(res => res.json())
			.then(data => {
				if(data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: GET_ORDER, payload: data});
				}
			})
			.catch(err =>{
				console.log(err);
			})
	}
};



/**
 * @description Action creator for getting all orders. Dispatches action with type GET_ORDERS and payload of the fetched orders if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @return {Function} - Thunk -> action
 */
export const getOrders = () => {
	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			  },
		}

		await fetch('/api/orders', reqOptions)
		.then(res => res.json())
		.then(data => {
			if(data.error){
				dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
			} else {
				dispatch({type: GET_ORDERS, payload: data});
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
};



/**
 * @description Action creator for adding a new order. Dispatches actions:
 * - ADD_ORDER-type with payload that has the new order
 * - EMPTY_CART-type with no payload
 * - NEW_NOTIFICATION with orderMsg.newOrder in the payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} newOrder -  The new order to post
 * @return {Function} - Thunk -> action
 */
export const addOrder = (newOrder) => {
	/**
	 * helper function to check an object is an object
	 * @param {*} item to be checked whether it is an object(but not array, not null) or not
	 * @returns true if item is an object other than array or null
	 */
	 function isObject(item){
		return (typeof item === 'object' &&
				!Array.isArray(item) &&
				item !== null)
	}
	
	return async(dispatch) => {
		const url = '/api/orders';
		const reqOptions = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(newOrder)
		};

		await fetch(url, reqOptions)
			.then(res => res.json())
			.then(data => {
				console.log("data === ", data);
				
				if(data.error){
					if (isObject(data.error)){
						
						//the key here is image, but it is better to get the key out, in case it is sth else
						const key = Object.keys(data.error)[0];
						
						//data.error[key] is equals to data.error.image, but key is a parameter, so cannot use '.' should use '[]'
						dispatch({type: NEW_NOTIFICATION, payload: {message: data.error[key], isSuccess: false}});
					} else {
						dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
					}

				} else {
					dispatch({type: EMPTY_CART});
					dispatch({type: ADD_ORDER, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: orderMsg.newOrder, isSuccess: true}})
					
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
};
