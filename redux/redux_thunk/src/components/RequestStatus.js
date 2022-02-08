/** @format COMPONENTS */

import { useSelector } from 'react-redux';

// export const RequestStatus = () => {
// 	return null;
// };


//copied from React/players_crud/src/components

export const RequestStatus = ({ status }) => {

	return(
	  <div className="request-status">{status}</div>
	);
  };
