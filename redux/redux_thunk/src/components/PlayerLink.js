/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { getSelectedPlayer } from '../redux/actionCreators/thunks/PlayerLink';

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
  