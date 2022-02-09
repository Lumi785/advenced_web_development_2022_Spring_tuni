/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS } from '../constants';


const defaultState = [];

const playersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_PLAYER:
			console.log("action.payload = ", action.payload);

			//note here not need to set id, because in this excercise, will send post request to backend, where id will be given
			return [...state, action.payload]
			
		case REMOVE_PLAYER:
		
			return state.filter(player => player.id !== action.payload);
			 
		case SET_PLAYERS:
			
			return action.payload


		default:
			return state;
	}
};

export default playersReducer;
