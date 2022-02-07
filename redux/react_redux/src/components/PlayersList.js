/** @format COMPONENTS */

import { useSelector} from 'react-redux';
import { Player } from './Player';

const selectPlayers = state => state.players;

//TODO: to be completed
export const PlayersList = () => {

	const players = useSelector(selectPlayers);
	console.log("players from PlayersList.js = ", players);

	// if (players.length === 0){
	// 	console.error("no players");
	// 	return(<></>);
	// }



	const renderedPlayerItems = players.map(player => {
		console.log("player = ", player);
		return <Player id={player.id} key={player.id} name={player.name} isActive={player.isActive} />
	})

	return(
		<ol id='players-list'>{renderedPlayerItems}</ol>

	)

	


};
