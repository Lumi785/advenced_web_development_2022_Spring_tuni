/** @format COMPONENTS */

import { useSelector } from 'react-redux';


//pre-check what properties are in state?
// import store from '../redux/store';  
// const state = store.getState();


const selectStatus = state => state.status;

export const RequestStatus = () => {

	const status = useSelector(selectStatus);

	return(
	  <div className="request-status">{status}</div>
	);

};
