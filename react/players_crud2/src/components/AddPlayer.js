import { useState } from "react";


export const AddPlayer = ({ handleSubmit, isLogin }) => {
  //cannot const [player, setPlater] = useState({XXX})
  //should devide the player's properties and each with useState
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    // const player = {name:{name}, isActive:false};
    // handleSubmit({name, isActive});
    handleSubmit(e, isLogin);
    setName('');
    
  }

  return (
  <form onSubmit={onSubmit}>

    <input required value={name} onChange={e=>setName(e.target.value)} type="text" name="name" id="name" />
    <input type="checkbox" name="active" id="active" />
    <button type="submit">Add</button>
  
  </form>

  )

};
