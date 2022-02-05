import * as actions from './actionTypes.js';

let lastId = 0;
export default (state = [], action) => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  switch(action.type){
    case "ADD_PLAYER":
      return [...state, 
        {
          id: ++lastId,
          name: action.payload.name,
          isActive: false
        }];

    case "REMOVE_PLAYER":
      return state.fileter(player => player.id !== action.payload.id);

    case "TOGGLE_PLAYER_STATUS":
      return state.map(player => player.id === action.payload.id ? true:false);

    default:
      return state;

  }
};





// export const REMOVE_PLAYER = 'REMOVE_PLAYER';

// export const ADD_PLAYER = 'ADD_PLAYER';
// export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
