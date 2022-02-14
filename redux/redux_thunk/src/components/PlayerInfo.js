/** @format COMPONENTS */

import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedPlayer } from '../redux/actionCreators/thunks/PlayerInfo';

const selectSelectedPlayer = state => state.selectedPlayer;
//console.log("aaaaa = ", selectSelectedPlayer);

export const PlayerInfo = () => {

	const selectedPlayer = useSelector(selectSelectedPlayer);
	//console.log("selectedPlayer = ", selectedPlayer);

	const dispatch = useDispatch();

	const onClick = e => {
		e.preventDefault();
		dispatch(deleteSelectedPlayer());
	}

	function c (player){
		let a;
		if(player.isActive === false){
		 a = 'not active';
		} else {
		  a = 'active';
		}
		return a;
	  }
	  const aa = c(selectedPlayer);
	 

	return ( 
		<div id="selected-player" >
		<div className="player-id">{selectedPlayer.id}</div>
		<div className="player-name">{selectedPlayer.name}</div>
		<div className="player-status">{aa}</div>
		<button className="delete-btn" 
		onClick={onClick}
		>Delete</button>
		</div>
	);
};

  