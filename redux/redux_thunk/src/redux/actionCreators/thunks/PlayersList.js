/** @format THUNK*/

import { ERROR, LOADING, READY } from '../../constants';
import { setPlayers } from '../playersActions';
import { setStatus } from '../statusActions';

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */
export const getPlayers = () => {
    const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
    }

    return async (dispatch) => {
    
        dispatch(setStatus(LOADING));

        await fetch('/api/players', reqOptions)
        .then(res => {
            if (res.error){console.log("response error = ", res.error)} 
            //NOTE, this ERROR is not the same as setStatus(ERROR)
            //console.log("res === ", res);
            return res.json()
        })
        .then(data => {
            //console.log("data === ", data);
            dispatch(setStatus(READY));
            dispatch(setPlayers(data));
           
        }).catch(err => {
            console.log("error occured: ", err);
            dispatch(setStatus(ERROR));
        })

    }

};
