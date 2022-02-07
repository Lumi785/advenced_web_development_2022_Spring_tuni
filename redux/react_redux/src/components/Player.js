/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { removePlayer } from '../redux/actionCreators/playersActions';

export const Player = ({ name, isActive, id }) => {
	//TODO
	const dispatch = useDispatch();

	const handleRemove = id => {
		
		dispatch(removePlayer(id));
	};

	function checkIsActive(isActive){
		return isActive===true? "active" : "not active";
	}

	let activeStatus = checkIsActive(isActive);

	//TOCO: complete
	return (
		
		<div className='player'>
			<p>{id}</p>
			<p>{name}</p>
			<p>{activeStatus}</p>
			<button className='remove-btn' onClick={()=>handleRemove(id)}
				>Remove</button>
		</div>
	);
};
