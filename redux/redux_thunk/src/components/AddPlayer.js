/** @format COMPONENTS */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPlayer } from '../redux/actionCreators/thunks/AddPlayer';


	

export const AddPlayer = () => {


	//cannot const [player, setPlater] = useState({XXX})
  	//should devide the player's properties and each with useState
	const [name, setName] = useState('');
	const [isActive, setIsActive] = useState(false);

	const dispatch = useDispatch();

	function handleSubmit(newPlayer){
	
		dispatch(postPlayer(newPlayer));
	
	}
	
  	const onSubmit = e => {
	  	
		e.preventDefault();

		const player = {name:name, isActive:isActive};

		handleSubmit(player);

		setName('');
		
  }

  return (
  <form onSubmit={onSubmit}>

    <input required value={name} onChange={e=>setName(e.target.value)} type="text" name="name" id="name" />
    <input type="checkbox" name="active" id="active" value={isActive} onChange={e=>setIsActive(!e.target.value)}/>
    <button type="submit">Add</button>
  
  </form>

  )

};
