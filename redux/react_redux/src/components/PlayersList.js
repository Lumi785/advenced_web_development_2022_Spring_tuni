/** @format COMPONENTS */

import { useSelector} from 'react-redux';
import { Player } from './Player';

const selectPlayers = state => state.players;

//TODO: to be completed
export const PlayersList = () => {

	const prePlayers = useSelector(selectPlayers);
	console.log("preplayers from PlayersList.js = ", prePlayers);
	const ids = Object.keys(prePlayers)
	console.log("ids = ", ids);
	let players;

	function isObject(val) {
		return val instanceof Object; 
	}

	if (!Array.isArray(prePlayers) && isObject(prePlayers)){
	 	players = prePlayers.players;
		
	} else { players = prePlayers}

	console.log("players after prePlayers = ", players);


	const renderedPlayerItems = players.map(player => {
		console.log("player = ", player);
		return <Player player={player} key={player.id} name={player.name} id={player.id} isActive={player.isActive} />
	})

	return(
		<ol role='list' id='players-list'>{renderedPlayerItems}</ol>
	)

};
