/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { removePlayer } from '../redux/actionCreators/playersActions';

export const Player = ({ name, isActive, id }) => {
	//TODO
	const dispatch = useDispatch();

	const handleRemove = (id) => {
		dispatch(removePlayer(id));
	};


	//TOCO: complete
	return (
		
		<div className='player' onClick={handleRemove}>
			<p>{id}</p>
			<p>{name}</p>
			<p>{isActive}</p>
			<button className='remove-btn'>Remove</button>
		</div>
	);
};
