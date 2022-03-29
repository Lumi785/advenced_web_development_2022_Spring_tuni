/** @format */

// NOTIFICATION ACTION CREATORS

import { NEW_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

/**

 * @description Action creator that Dispatches a NEW_NOTIFICATION action to the frontends notification-state along with the payload that includes message.
 * @param {object} newNotification - The notification details
 * @param {string} newNotification.message - The notification message
 * @param {string} newNotification.isSuccess - Tells whether or not it is a succesfull (green) or unsuccessfull (red) message
 * @return {object} action


 */
export const createNotification = (newNotification = { message: '', isSuccess: false }) => {
	console.log("new notification = ", newNotification);
	return async(dispatch) => {
		dispatch({
			type: NEW_NOTIFICATION, 
			payload: {message: newNotification.message, isSuccess: newNotification.isSuccess
		}});
	};
};



/**

 * @description Action creator that sends a REMOVE_NOTIFICATION-type action
 * @return {Object} action
 */
export const removeNotification = () => {
	
	return {type: REMOVE_NOTIFICATION};
	
};
