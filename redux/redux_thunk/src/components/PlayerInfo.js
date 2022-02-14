/** @format COMPONENTS */

import { useDispatch, useSelector} from 'react-redux';
import { deleteSelectedPlayer } from '../redux/actionCreators/thunks/PlayerInfo';


const selectSelectedPlayer = state => state.selectedPlayer;

export const PlayerInfo = () => {
	
	const selectedPlayer = useSelector(selectSelectedPlayer);

	//Helper function to check whether an object is empty or not
	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	
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
	 

	return ( (!isEmpty(selectedPlayer)) && (

		<div id="selected-player" >
			<div className="player-id">{selectedPlayer.id}</div>
			<div className="player-name">{selectedPlayer.name}</div>
			<div className="player-status">{aa}</div>
			<button className="delete-btn" onClick={onClick}>Delete</button>
		</div>
		)
	);
};

  