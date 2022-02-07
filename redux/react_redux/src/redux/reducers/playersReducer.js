/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER } from '../constants';


let lastId = -1;


export const initialState = {
	players: []
};

//TODO: previous exercise is reusable here
export function playersReducer(state = initialState, action){

  // TODO: Implement this function
  //throw new Error('Not Implemented');
  switch(action.type){
    case ADD_PLAYER:
		return {
			players: [
				...state.players, 
				{
				id: ++lastId,
				name: action.payload.name,
				isActive: action.payload.isActive
				}
			]

		}
		

    case REMOVE_PLAYER:
		console.log("before revove players from test= ", state.players);
		
		//from aonther student
		//let id = parseInt(action.payload);
		
		const newPlayers = state.players.filter(player => player.id !== parseInt(action.payload));

		console.log("newPlayers = ", newPlayers);
		return {
			...state,
			players: newPlayers
		}
		;


    
   
               
    default:
      	return state;

	}
}
	




