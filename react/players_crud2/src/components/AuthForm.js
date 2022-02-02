import {useState} from 'react';

export const AuthForm = ({ handleSubmit }) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const player = {name, password};
    console.log("player from auth form = ", player);
    handleSubmit(player);
    setName('');
    setPassword('');
    
  }
  return (

    <form id="auth-form" role="heading" onSubmit={onSubmit}>
      <a role="link">Register</a>
      <button role="button" type="submit">Register</button>
      <input type="text" name="username" id="username" required value={name} onChange={e=>setName(e.target.value)} placeholder="name"/>
      <input type="password" name="password" id="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="name"/>

    </form>









  );
};
