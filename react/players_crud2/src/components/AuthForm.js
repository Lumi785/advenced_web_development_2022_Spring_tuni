import {useState} from 'react';

export const AuthForm = ({ handleSubmit, isLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formMode, setFormMode] = useState('register');

  
  

  const onSubmit = e => {
    e.preventDefault();
    // const player = {username, password};
    // console.log("player from auth form = ", player);
    // console.log("username from authForm = ", e.target.username.value) 
    // console.log("password from authForm ", e.target.password.value)
    //const player = {e.target.username.value, e.target.password.value}

    handleSubmit(e, isLogin);
    setUsername('');
    setPassword('');
  }

  function changeFormMode(){
      
    if (formMode === 'register'){
      setFormMode('login');
    }
    else {
      setFormMode('register');
    }
  }


  
  return (

    <form id="auth-form" role="heading" onSubmit={onSubmit}>
      {(formMode==='register' && <a role="link" onClick={(e) => {
        e.preventDefault();
        changeFormMode()}
      }
        >Go to Login</a>) || (<a role="link" onClick={(e) => {
          e.preventDefault();
          changeFormMode();
        }}
      >Go to Register</a>)}
      
      {(formMode==='register' && <button role="heading" role="button" type="submit">Register</button>) || (<button role="heading" role="button" type="submit">Log In</button>)}

      <input required type="text" name="username" id="username"  value={username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>

      <input required type="password" name="password" id="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>

    </form>

  );
  
};
