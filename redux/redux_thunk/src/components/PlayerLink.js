/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { getSelectedPlayer } from '../redux/actionCreators/thunks/PlayerLink';

// export const PlayerLink = ({ name, url }) => {
// 	return ( null );
// };



// //copied from React/players_crud/src/components
export const PlayerLink = ({ name, onClick, url, id }) => {


	return(
	  
	  <li role="listitem" id={id}>
	  <a href={url} role="link" onClick={
		(e) => {
		  onClick(url);
		  console.log("onlick url ====== ", url);
		  e.preventDefault();
		}}
		>{name}</a>
	  </li>
  
	)
  };
  