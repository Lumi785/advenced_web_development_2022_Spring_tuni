/** @format THUNK*/

import { ERROR, LOADING, READY } from '../../constants';
import { addPlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';
import { setStatus } from '../statusActions';


/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk
 */
export const  postPlayer =  (newPlayer) => {
    //console.log("from thunk player = ", newPlayer);

    const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(newPlayer)
    }

    return async (dispatch) => {
    
        dispatch(setStatus(LOADING));

        await fetch('/api/players', reqOptions)
        .then(res => {
            if (res.error){console.log("response error = ", res.error)}
            return res.json();
        })
        .then(data => {
            //console.log("data === ", data);
            dispatch(setStatus(READY));
            dispatch(addPlayer(data));
            dispatch(clearSelectedPlayer());
        }).catch(error => {
            console.log("error occured: ", error);
            dispatch(setStatus(ERROR));
        })

    }
 
};
