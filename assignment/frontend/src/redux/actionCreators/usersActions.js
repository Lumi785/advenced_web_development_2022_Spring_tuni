/** @format */

// USERS ACTION CREATORS

import {
	GET_USER,
	GET_USERS,
	NEW_NOTIFICATION,
	REMOVE_USER,
	UPDATE_USER,
} from '../constants';

//Use these for the notifications sent.
const userMsg = {
	gotUser: 'Single user received',
	gotUsers: 'Users received',
	updateUser: 'User updated.',
	delete: (user) => {
		return `${user.name} deleted successfully`;
	},
};

/**
 * @description Asynchronous action creator that gets a single user from the backend (if possible). If succesful, dispatches GET_USER-type action with the user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} userId - The users id that is to be fetched.
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUser = (userId) => {

	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}

		console.log("'/api/users'+ userId = ", '/api/users/'+ userId);

		await fetch('/api/users/'+ userId, reqOptions)
			.then(res => {
				if(res.ok){
					return res.json();
				}
			})
			.then(data => {
				console.log("data === ", data);
				dispatch({
					type: GET_USER,
					payload: data
				})
			})
			.catch(err =>{
				console.log(err);
				dispatch({
					type: NEW_NOTIFICATION,
					payload: {message: err,  isSuccess: false,}
				})
			})
	}
};
/**
 * @description Asynchronous action creator that attempts to get all the users from the backend. If successful, dispatches GET_USERS-type action with users as payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUsers = () => {

	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			  },
		}

		await fetch('/api/users', reqOptions)
		.then(res => {
			if(res.ok){
				return res.json();
			}
			else{
				console.log("res.statutext = ", res.statusText)
				console.log("res.json() = ", res.json())
				console.log("res = ", res.err.message)

			}
			// else{
			// 	res.json().then(aa => console.log("aa ==== ", aa))
			// }
		})
		.then(data => {
			//console.log("data = ", data);
			dispatch({
				type: GET_USERS,
				payload: data
			})
		})
		.catch(err => {
			console.log("err ======= ", err);
			// dispatch({
			// 	type: NEW_NOTIFICATION,
			// 	payload: {message: err, isSuccess: false}

			// })
		})
	}







};
/**
 * @description Asynchronous action creator that updates the given user (if possible). If Successful, dispatches actions in the following order:
 * 1) UPDATE_USER type with user as payload
 * 2) NEW_NOTIFICATION with a succesfull message that uses userMsg.update
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} updatedUser - contains the updated user data
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const updateUser = (updatedUser) => {

	console.log("updatedUser = ", updatedUser);

	return async(dispatch) => {
		const url = '/api/users/' + updatedUser.id;
		const reqOptions = {
			method: 'PUT',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedUser)
		};

		await fetch(url, reqOptions)
			.then(res => {
				if(res.ok){
					return res.json();
				}
			})
			.then(data => {
				console.log("data from update = ", data);
				dispatch({type: UPDATE_USER, payload: data});
				dispatch({type: NEW_NOTIFICATION, payload: {message: userMsg.updateUser, isSuccess: true}})
			})
			.catch(err => {
				console.log(err);
				dispatch({type: NEW_NOTIFICATION})
			})
	}

	
};
/**
 * @description Removes the user (if possible) from the backend. If successful, dispatches actions in following order:
 * 1) REMOVE_USER-type with payload of user.
 * 2) NEW_NOTIFICATION with a successful message that uses userMSg.delete
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} - The users id that is to be fetched
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const removeUser = (userId) => {
	return async(dispatch) => {
		const url = '/api/users/' + userId;
		const reqOptions = {
			method: 'DELETE',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(userId)
		};

		await fetch(url, reqOptions)
			.then(res => {
				if (res.ok){
					return res.json();
				} else {
					dispatch({
						type: NEW_NOTIFICATION,
						payload: {message: 'apple', isSuccess: false}
					})
					return;
				}
			})
			.then(data => {
				dispatch({type: REMOVE_USER, payload: data});
				dispatch({type: NEW_NOTIFICATION, payload: {message: userMsg.delete(data), isSuccess: true}});
			})
			.catch(err => console.log(err));
	}

	
};
