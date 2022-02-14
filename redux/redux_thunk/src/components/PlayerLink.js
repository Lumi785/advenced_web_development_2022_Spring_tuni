/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { getSelectedPlayer } from '../redux/actionCreators/thunks/PlayerLink';


//copied from React/players_crud/src/components
export const PlayerLink = ({ name, url, id}) => {


	const dispatch = useDispatch();

	const onClick= e => {
		  e.preventDefault();
		  dispatch(getSelectedPlayer(url));
		}

	return(
	  
	  <li role="listitem" id={id}>
		  
		<a href={url} role="link" onClick={onClick} 
			>{name}</a>
	  </li>
  
	)
};
  