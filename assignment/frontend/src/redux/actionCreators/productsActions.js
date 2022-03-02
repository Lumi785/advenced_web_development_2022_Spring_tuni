/** @format */

// PRODUCT ACTION CREATORS

import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	GET_PRODUCT,
	GET_PRODUCTS,
	NEW_NOTIFICATION,
	UPDATE_PRODUCT,
} from '../constants';

export const productMsg = {
	added: 'Product added.',
	updated: 'Product updated.',
	deleted: (product) => {
		return `${product.name} deleted successfully`;
	},
};

/**
 * @description Asynchronous Action creator for getting a single product. Dispatches an action with type GET_PRODUCT through thunk if succesful or NEW_NOTIFICATION-type and error message from db in the payload
 * @param {String} productId - The id of the product to get
 * @return {Function} - Thunk -> action
 */
export const getProduct = (productId) => {
	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}

		await fetch('/api/products/'+ productId, reqOptions)
			.then(res => res.json())
			.then(data => {
				if(data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: GET_PRODUCT, payload: data});
				}
			})
			.catch(err =>{
				console.log(err);
			})
	}
};



/**
 * @description Asynchronous Action creator that dispatches all the products it receives from DB to the frontends redux-stores product-state. Dispatches GET_PRODUCTS with products as payload if succesfull, or NEW_NOTIFICATION-type and error message from db in the payload
 * @return {Function} - Thunk -> action
 */
export const getProducts = () => {
	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			  },
		}

		await fetch('/api/products', reqOptions)
		.then(res => res.json())
		.then(data => {
			if(data.error){
				dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
			} else {
				dispatch({type: GET_PRODUCTS, payload: data});
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
};



/**
 * @description Asynchronous Action creator that adds a new product to the DB, then dispatches an ADD_PRODUCT-type action with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.added as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message. If the error itself is an object, then it should pass whatever is inside the object.
 *  * @param {Object} productToAdd - The product to add
 * @return {Function} - Thunk -> action
 */
export const addProduct = (productToAdd) => {
	//console.log("product to be add === ", productToAdd);

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
		const url = '/api/products';
		const reqOptions = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(productToAdd)
		};

		await fetch(url, reqOptions)
			.then(res => res.json())
			.then(data => {
				
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
					dispatch({type: ADD_PRODUCT, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: productMsg.added, isSuccess: true}})
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
	
};




/**
 * @description Asynchronous Action creator that updates an existing product in the DB, then dispatches an UPDATE_PRODUCT-type action to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.updated as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {Object} productToUpdate - The product with updated values
 * @return {Function} - Thunk -> action
 */
export const updateProduct = (productToUpdate) => {
	return async(dispatch) => {
		const url = '/api/products/' + productToUpdate.id;
		const reqOptions = {
			method: 'PUT',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(productToUpdate)
		};

		await fetch(url, reqOptions)
			.then(res => res.json())
			.then(data => {
				if(data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: UPDATE_PRODUCT, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: productMsg.updated, isSuccess: true}})
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
};




/**
 * @description Asynchronous Action creator that deletes existing product in the DB, then dispatches a DELETE_PRODUCT-type action along with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.deleted(product) as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {String} productId - The id of the product to delete
 * @return {Function} redux thunk -> action
 */
export const deleteProduct = (productId) => {
	return async(dispatch) => {
		const url = '/api/products/' + productId;
		const reqOptions = {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			}

		};

		await fetch(url, reqOptions)
			.then(res => res.json()
			)
			.then(data => {
				if (data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: DELETE_PRODUCT, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: productMsg.deleted(data), isSuccess: true}});
				}
			})
			.catch(err => console.log(err));
	}	
};
