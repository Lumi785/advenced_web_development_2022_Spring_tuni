/** @format THUNK*/

import { ERROR, LOADING, READY } from '../../constants';
import { setSelectedPlayer } from '../selectedPlayerActions';
import { setStatus } from '../statusActions';

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @param {String} url -  url of the player to be selected
 * @return {Function} - thunk
 */
export const getSelectedPlayer = (url) => {

    const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
    }

    return async (dispatch) => {
    
        dispatch(setStatus(LOADING));

        await fetch(url, reqOptions)
        .then(res => {
            if (res.error){console.log("response error = ", res.error)}
            //console.log("res === ", res);
            return res.json()
        })
        .then(data => {
            //console.log("data === ", data);
            dispatch(setStatus(READY));
            dispatch(setSelectedPlayer(data));
           
        }).catch(err => {
            console.log("error occured: ", err);
            dispatch(setStatus(ERROR));
        })

    }






};
