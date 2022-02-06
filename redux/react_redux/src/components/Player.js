/** @format COMPONENTS */

import { useDispatch } from 'react-redux';
import { removePlayer } from '../redux/actionCreators/playersActions';

export const Player = ({ name, isActive, id }) => {
	//TODO
	const dispatch = useDispatch();

	const handleRemove = (id) => {
		dispatch({
			type: {removePlayer},
			payload: id
		})

	};


	//TOCO: complete
	return (
		
		<div className='player' onClick={handleRemove}>
			<h3>{id}</h3>
			<h3>{name}</h3>
			<h3>{isActive}</h3>
			<button className='remove-btn'>Remove</button>
		</div>
	);
};
