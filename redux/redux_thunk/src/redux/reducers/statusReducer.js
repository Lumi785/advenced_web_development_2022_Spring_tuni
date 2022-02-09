/** @format REDUCERS*/

import { SET_STATUS } from '../constants';

export const requestStatus = {
	LOADING: 'Loading...',
	READY: '',
	ERROR: 'An error has occurred!!!',
};

// This is the default state
const defaultState = requestStatus.LOADING;

const statusReducer = (state = defaultState, action) => {

	// console.log("status reducer action.payload = ", action.payload);
	// console.log("action from status REducer = ", action);

	switch(action.type){
		case SET_STATUS:
			return requestStatus[action.payload];
		default:
			return state;
	}

	
};

export default statusReducer;
