import * as actions from './actionTypes.js';

let lastId = 0;
export default (state = [], action) => {
  // TODO: Implement this function
  //throw new Error('Not Implemented');
  switch(action.type){
    case "ADD_PLAYER":
      return [
        ...state, 
        {
          id: ++lastId,
          name: action.payload.name,
          isActive: action.payload.isActive
        }];

    case "REMOVE_PLAYER":
      return state.filter(player => player.id !== action.payload.id);

    case "TOGGLE_PLAYER_STATUS":
      
      if (state.length === 0){
        return state;
      }
      
      const tempArray = state.filter(player => player.id === action.payload.id);

      if (tempArray.length === 0){
        return state;
      }

      let updatedPlayer = tempArray[0];

      console.log("update palyer before = ", updatedPlayer);
      
      updatedPlayer.isActive = !(updatedPlayer.isActive);
      
      console.log("update palyer after = ", updatedPlayer);


      let newState = state.filter(player => player.id !== action.payload.id);

      console.log("newstateb= ", newState);

      newState.push(updatedPlayer);

      return newState;
     
    default:
      return state;

  }
};
