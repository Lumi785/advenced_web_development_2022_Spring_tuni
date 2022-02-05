import * as actions from './actionTypes.js';

export const addPlayer = (name, isActive = false) => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  return {
    type: "ADD_PLAYER",
    payload: {
      name: name,
      isActive: false
    }
  }
};

export const removePlayer = id => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  return {
    type: "REMOVE_PLAYER",
    payload: {
      id: id
    }
  }
};

export const togglePlayerStatus = id => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  return {
    type: "TOGGLE_PLAYER_STATUS",
    payload: {
      id: id
    }
  }
};


// export const REMOVE_PLAYER = 'REMOVE_PLAYER';

// export const ADD_PLAYER = 'ADD_PLAYER';
// export const TOGGLE_PLAYER_STATUS = 'TOGGLE_PLAYER_STATUS';
