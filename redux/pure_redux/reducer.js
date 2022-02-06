import * as actions from './actionTypes.js';

let lastId = 0;
export default (state = [], action) => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  switch(action.type){
    case actions.ADD_PLAYER:
      return [
        ...state, 
        {
          id: ++lastId,
          name: action.payload.name,
          isActive: action.payload.isActive
        }];

    case actions.REMOVE_PLAYER:
      return state.filter(player => player.id !== action.payload.id);

    case actions.TOGGLE_PLAYER_STATUS:
      
      if (state.length === 0){
        return state;
      }

      const tempArray = state.filter(player => player.id === action.payload.id);

      if (tempArray.length === 0){
        return state;
      }

      let updatedPlayer = tempArray[0];
      const ind = state.indexOf(updatedPlayer);

      

      console.log("update palyer before = ", updatedPlayer);
      
      updatedPlayer.isActive = !(updatedPlayer.isActive);
      
      console.log("update palyer after = ", updatedPlayer);

      const newState = [...state.splice(0, ind),
                        updatedPlayer,
                        ...state.splice(1, state.length)
                        ]

      //This is how to update an array in a store
      //take the copy of state from index of 0 to ind-1, then add updatedPlayer at position ind,
      // then remove one element(the old version of updatedPlayer which is at original ind postion, 
      //then continuelly copy from now ind +1 to the end of array. 

      return newState;
     
    default:
      return state;

  }
};
