/** @format COMPONENTS */

import { useSelector} from 'react-redux';
import { Player } from './Player';

const selectPlayers = state => state.players;

//TODO: to be completed
export const PlayersList = () => {

	const players = useSelector(selectPlayers);
	console.log("players from PlayersList.js = ", players);
	const ids = Object.keys(players)
	console.log("ids = ", ids);


	const renderedPlayerItems = players.map(player => {
		console.log("player = ", player);
		return <Player key={player.id} name={player.name} id={player.id} isActive={player.isActive} />
	})

	return(
		<ol role='list' id='players-list'>{renderedPlayerItems}</ol>

	)

	


};
