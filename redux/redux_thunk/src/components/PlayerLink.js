/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
// import { Player } from '../../../react_redux/src/components/Player';
import { PlayerInfo } from './PlayerInfo';
import { getSelectedPlayer } from '../redux/actionCreators/thunks/PlayerLink';


//copied from React/players_crud/src/components
export const PlayerLink = ({ name, url}) => {

	const dispatch = useDispatch();

	const onClick= e => {
		  e.preventDefault();
		  dispatch(getSelectedPlayer(url));
		}

	return(
	  
	  <li role="listitem" >
		  
	  <a href={url} role="link" onClick={onClick}
		>{name}</a>
	  </li>
  
	)
};
  