import * as actions from './actionTypes.js';

export default (state = [], action) => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  switch(action.type){
    case "ADD_PLAYER":
      return state + action.payload;
    case "REMOVE_PLAYER":
      return state - action.payload;
    case "TOGGLE_PLAYER_STATUS":
      return state;
    default:
      return state;

  }
};
// export const REMOVE_PLAYER = 'REMOVE_PLAYER';

// export const ADD_PLAYER = 'ADD_PLAYER';
// export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
