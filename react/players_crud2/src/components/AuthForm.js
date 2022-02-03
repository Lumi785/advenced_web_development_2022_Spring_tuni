import {useState} from 'react';

export const AuthForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    const player = {username, password};
    console.log("player from auth form = ", player);
    handleSubmit(player);
    setUsername('');
    setPassword('');
    
  }
  return (

    <form id="auth-form" role="heading" onSubmit={onSubmit}>
      <a role="link">Register</a>
      
      <button role="heading" role="button" type="submit">Log In</button>
      <input type="text" name="username" id="username"  value={username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>
      <input type="password" name="password" id="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>

    </form>









  );
};
