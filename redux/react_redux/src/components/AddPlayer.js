/** @format COMPONENTS */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../redux/actionCreators/playersActions';
import store from '../redux/store';


export const AddPlayer = () => {
	
	// TODO: assignments of member variables
	// imports above hint how to proceed
	const [name, setName] = useState('');
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();
	const handleChange = e => setName(e.target.value);

	const handlePlayerSubmit = (e) => {
		e.preventDefault();
		const name = e.target.value;
		const player = {name, isActive};
		dispatch({
			type: 'addPlayer',
			payload: player
		})
		
	};

	//TODO: complete the JSX 
	return (
		<div>
			<h2>Add player</h2>
			<form action="" onSubmit={handlePlayerSubmit}>
				<input type="text" name='name' id='name' placeholder='input your name' 
				value={name} onChange={handleChange}/>

				<input type="checkbox" name='active' id='active'/>
				<button type='submit'>Add</button>
			</form>

		</div>
	);
};
