/** @format THUNK*/

import { ERROR, LOADING, READY } from '../../constants';
import { removePlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';
import { setStatus } from '../statusActions';



/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with "LOADING"-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with "READY" string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with "ERROR" string as param
 * @return {Function} - thunk
 */


export const deleteSelectedPlayer = () => {

    const reqOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        }
    }

    return async (dispatch, getState) => {
        const selectedPlayer = getState().selectedPlayer;
        console.log("selectedPlayer = ", selectedPlayer);

        dispatch(setStatus(LOADING));

        await fetch('/api/players/'+ selectedPlayer.id, reqOptions)
        .then(res => {
            if (res.error){console.log("response error = ", res.error)}
            console.log("res === ", res);
            return res.json()
        })
        .then(data => {
            dispatch(setStatus(READY));
            dispatch(removePlayer(selectedPlayer.id));
            dispatch(clearSelectedPlayer());
        }).catch(err => {
            console.log("error occured: ", err);
            dispatch(setStatus(ERROR));
        })

    }


};
