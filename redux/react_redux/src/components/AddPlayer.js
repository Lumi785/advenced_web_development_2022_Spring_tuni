/** @format COMPONENTS */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayer } from '../redux/actionCreators/playersActions';

export const AddPlayer = () => {
	
	// TODO: assignments of member variables
	// imports above hint how to proceed
	const [name, setName] = useState('');
	const [isActive, setIsActive] = useState(false);
	const dispatch = useDispatch();

	const hanldeToggle = e => setIsActive(!isActive);

	function handlePlayerSubmit(e){
		console.log("apple");
		e.preventDefault();

		//Note here should not use below name = e.target.value, becaue then name will be ''
		// the name now can be read directly from name in state ([name, setName]), same with
		//isActive
		// const name = e.target.value;
		console.log("name = ", name);
		const player = {name, isActive};
		dispatch(addPlayer(player));
		
	};

	//TODO: complete the JSX 
	return (
		<div>
			<h2>Add player</h2>
			<form onSubmit={handlePlayerSubmit}>
				<input type="text" name='name' id='name' placeholder='input your name' 
				value={name} onChange={e=>setName(e.target.value)}/>
				<label htmlFor="active">is active</label>
				<input type="checkbox" name='active' id='active' onClick={hanldeToggle}/>
				<button type='submit'>Add</button>
			</form>

		</div>
	);
};
