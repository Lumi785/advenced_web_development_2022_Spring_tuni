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
 * @description Asynchronous action creator that gets a single user from the backend (if possible) and sends that through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {string} userId - The users id that is to be fetched.
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUser = (userId) => {

	return async(dispatch) => {
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		};

		await fetch('/api/users/'+ userId, reqOptions)
			.then(res => res.json())
			.then(data => {
				if(data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: GET_USER, payload: data});
				}
			})
			.catch(err =>{console.log(err);});
	};
};



/**
 * @description Asynchronous action creator that gets all the users from the backend (if possible) and sends that Array through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUsers = () => {
	// console.log("getUsers called ...");

	return async(dispatch) => {
		
		const reqOptions = {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
		};

		await fetch('/api/users', reqOptions)
		.then(res => {

			return res.json();
		})
		.then(data => {
			
			//console.log("data from usersACTIONS = ", data);
			if(data.error){
				dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
			} else {
				dispatch({type: GET_USERS, payload: data});
			}
		})
		.catch(err => {
			console.log("err ======= ", err);
		});
	};
};



/**
 * @description Asynchronous action creator that updates the given user (if possible) and sends the user received from the backend through thunk to reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} updatedUser - contains the updated user data
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const updateUser = (updatedUser) => {

	//console.log("updatedUser from updateUser thunk= ", updatedUser);

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
			.then(res => res.json())
			.then(data => {
				if(data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {
					dispatch({type: UPDATE_USER, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: userMsg.updateUser, isSuccess: true}});
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
};



/**
 * @description Removes the user (if possible) from the backend, then dispatches an action to remove it from the redux-store, as well as another action to notify the current user that the deletion was succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {string} - The users id that is to be fetched
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const removeUser = (userId) => {
	//console.log("remove user function called ...")
	//console.log("user id from remove user function = ", userId)
	return async(dispatch) => {
		const url = '/api/users/' + userId;
		const reqOptions = {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
	
		};

		await fetch(url, reqOptions)
			.then(res => {
				
				return res.json();
			})
			.then(data => {
				if (data.error){
					dispatch({type: NEW_NOTIFICATION, payload: {message: data.error, isSuccess: false}});
				} else {

					dispatch({type: REMOVE_USER, payload: data});
					dispatch({type: NEW_NOTIFICATION, payload: {message: userMsg.delete(data), isSuccess: true}});
				}
			})
			.catch(err => console.log(err));
	};	
};
