import {useState} from 'react';

export const AuthForm = ({ handleSubmit }) => {
  //console.log("islogin = ", isLogin);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formMode, setFormMode] = useState('login');

  console.log("form Mode = ", {formMode});

  
  

  const onSubmit = (e) => {
    console.log("e.currentTarget.localName = ", e.currentTarget.localName);
    console.log("e.currentTarget.method = ", e.currentTarget.method);
    e.preventDefault();
    // const player = {username, password};
    // console.log("player from auth form = ", player);
    // console.log("username from authForm = ", e.target.username.value) 
    // console.log("password from authForm ", e.target.password.value)
    //const player = {e.target.username.value, e.target.password.value}

    // const isLogin = formMode === 'login'? true:false;
    //this is the same as above code.
    const isLogin = formMode === 'login';
    console.log("isLogin = ", isLogin);
    handleSubmit(isLogin, e);
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
      {(formMode==='login' && <a role="link" onClick={(e) => {
        e.preventDefault();
        changeFormMode()}
      }
        >Register</a>) 
        
        || (<a role="link" onClick={(e) => {
          e.preventDefault();
          changeFormMode();
        }}
      >Log In</a>)}
      
      {(formMode==='login' && <button role="heading" role="button" type="submit">Log In</button>) || (<button role="heading" role="button" type="submit">Register</button>)}

      <input required type="text" name="username" id="username"  value={username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>

      <input required type="password" name="password" id="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="password"/>

    </form>

  );
  
};
