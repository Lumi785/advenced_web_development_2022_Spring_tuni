import { useState } from "react";


export const AddPlayer = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const player = {name:{name}, isActive:false};
    handleSubmit({name, isActive});
    
  }

  return (
  <form onSubmit={onSubmit}>

    <input required value={name} onChange={e=>setName(e.target.value)} type="text" name="name" id="name" />
    <input type="checkbox" name="active" id="active" />
    <button type="submit">Add</button>
  
  </form>

  )

    
  
};
