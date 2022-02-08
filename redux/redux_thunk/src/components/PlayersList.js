/** @format COMPONENTS */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../redux/actionCreators/thunks/PlayersList';

import { PlayerLink } from './PlayerLink';

// export const PlayersList = () => {
// 	return (null);
// };


//copied from React/players_crud/src/components

import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, selectPlayer }) => {
  console.log("ppppp = ", players);
  
  
  return(
    
    <ol id='players-list'>
    

      {players.map(player => <PlayerLink key={player.id} id={"player-"+player.id} name={player.name}  url={player.id} onClick={() => {
        selectPlayer(player.id);
        console.log("rose test click");}  }/>)}
      
     
    </ol>
  )
};


 
  
     //Put wrap function of selectPlayer by another function, is to prevent selectPlayer from being called automatically
