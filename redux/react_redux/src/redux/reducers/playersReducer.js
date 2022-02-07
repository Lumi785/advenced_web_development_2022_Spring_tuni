/** @format REDUCERS*/

import { ADD_PLAYER, REMOVE_PLAYER } from '../constants';


let lastId = 0;


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
		console.log("before revove players = ", state.players);
		console.log("action = ", action);
		// state.players.forEach(player => console.log(`player.id is: ${player.id}));

		
		const newPlayers = state.players.filter(player => player.id !== action.payload);
		console.log("newPlayers = ", newPlayers);
		return {
			...state,
			players: newPlayers
		}

    
   
               
    default:
      	return state;

	}
}
	




