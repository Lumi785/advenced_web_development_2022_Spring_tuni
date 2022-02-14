/** @format COMPONENTS */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../redux/actionCreators/thunks/PlayersList';

import { PlayerLink } from './PlayerLink';


const selectPlayers = state => state.players;

export const PlayersList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPlayers());

	}, [])
	
	const players = useSelector(selectPlayers);
	// const pp = players[0];
	// console.log("players 00000000 = ", players);
	// console.log("aslfjlsdjfkdjfdkgj = ", 'player=='+ pp.id)
  
  
	return(
		
		<ol id='players-list'>
		
		{players.map(player => <PlayerLink key={player.id} name={player.name} 
		player={player} id={`player-${player.id}`} url={'/api/players/' + player.id}/>)}
		
		</ol>
	)
};

// {players.map(player => <PlayerLink key={player.id} name={player.name} 
// 	player={player} url={player.id} id={`player-${player.id}`}/>)}
 
  
     //Put wrap function of selectPlayer by another function, is to prevent selectPlayer from being called automatically
