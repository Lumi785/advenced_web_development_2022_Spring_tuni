/** @format COMPONENTS */

import { useSelector} from 'react-redux';
import { Player } from './Player';

const selectPlayers = state => state.players;

//TODO: to be completed
export const PlayersList = () => {

	const players = useSelector(selectPlayers);
	
	const renderedPlayerItems = players.map(player => {
		return <Player key={player.id} name={player.name} isActive={player.isActive} />
	})

	return(
		<ol id='players-list'>{renderedPlayerItems}</ol>

	)

	


};
