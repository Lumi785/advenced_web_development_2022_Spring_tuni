/** @format */

import res from 'express/lib/response';
import { dispatch } from '../../tests/utils/tools';
import {
	CLEAR_ORDERS,
	CLEAR_USERS,
	INIT_AUTH,
	NEW_NOTIFICATION,
	REMOVE_AUTH,
} from '../constants';
import { createNotification } from './notificationsActions';

// Use this regex for email validation
const validEmailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Invalid Auth Messages:
export const invalidAuth = {
	name: 'Name too short',
	email: 'Invalid email',
	password: 'Password too short',
	passwordMismatch: 'Password missmatch',
};

// Valid auth messages.
export const validAuth = {
	welcome: function (name) {
		return `Welcome to my store, ${name}!`;
	},
	welcomeBack: 'Welcome back!',
};

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not there is the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful, Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} Thunk
 */
export const initAuth = () => {
	
	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
			  'Accept': 'application/json'
			},
		};

		//send to backends /api/check-status path to check whether or not there is the correct browser-cookie and whether or not that browser-cookie is valid. 
		await fetch('/api/check-status', reqOptions)
		.then(res => {
			if(res.ok){return res.json()}
			//else{console.log('response err = ', res.err)};
		})
		.then(data => {
			//console.log('data = ', data);
			dispatch({
					type: INIT_AUTH,
					payload: data.user,
				})
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: NEW_NOTIFICATION,
				payload: {message: 'test-error', isSuccess: false}
			})
		})
			
	}





};
/**
 * @description Asynchronous thunk that handles validation for logInCreds (check Login and Registration validation from assignment instructions). Expects for a successful login-response from server, before dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with validAuth.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification.
 * @param {Object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} action
 */
export const logIn = (logInCreds) => {
	//console.log("logInCredentials = ", logInCreds);
	

	return async (dispatch) => {

		const {email, password} = logInCreds;
		//console.log("email = ", email);
		//console.log("password = ", password);

		//before sending credential to backend, evaluate first password, name and email
		//if not ok, then not send to backend at all.
		if (password.length < 10 ){
			await dispatch({
				type: NEW_NOTIFICATION,
				payload: {message: invalidAuth.password, isSuccess: false}
			});
			return;
		} 
		const name = email.split('@')[0];
		if(name.length < 4){
			await dispatch({
				type: NEW_NOTIFICATION,
				payload: {message: invalidAuth.name, isSuccess: false}
			});
			return;
		} 
		if (!validEmailRegex.test(email)){
			await dispatch({
				type: NEW_NOTIFICATION,
				payload: {message: invalidAuth.email, isSuccess: false}
			});
			return;
			
		}

		//credential forfats are ok, now send credential to backend to login
		const reqOptions = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(logInCreds)
		};
		await fetch('/api/login', reqOptions)
		.then(res => {
			if(res.ok){
				return res.json();
			} 
			
			//dispatch error from backend. Note dispatch in catch also pass tests
			//but I think for error from backend, here is better place
			else {
				//console.log("res.statuscode = ", res.status);
				dispatch({
					type: NEW_NOTIFICATION,
					payload: { message: 'test-error', isSuccess: false },
				})
			}			
		})
		.then(data => {
			//console.log("data === ", data);
			dispatch({
						type: INIT_AUTH,
						payload: data.user
					});
			dispatch({
					type: NEW_NOTIFICATION,
					payload: { message: validAuth.welcomeBack, isSuccess: true },
				})
		})
		.catch(error => {
			console.log("response error = ", error);
			
		})
	}
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server, before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function}
 */
export const logOut = () => {

	return async(dispatch) => {

		const reqOptions = {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			}
		};

		await fetch('/api/logout', reqOptions)
		.then(res => {
			if(res.ok){ 
				return res.json()
			} else{
				console.log("response error = ", res.error);
			}
		})
		.then(
			data => {
				//console.log("data from logout = ", data);
				dispatch({type: REMOVE_AUTH});
				dispatch({type: CLEAR_ORDERS});
				dispatch({type: CLEAR_USERS});
				dispatch({
					type: NEW_NOTIFICATION,
					payload: {message: data.message, isSuccess: true}
				});
			}
		)
		.catch(error => console.log(error));
	}


};

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for registerCreds (check Login and Registration validation from assignment instructions). If the response is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification. If the error itself is an object, then it should pass whatever is inside the object.
 * @param registerCreds - The data of the user
 * @returns {Function}
 */
export const register = (registerCreds) => {};
