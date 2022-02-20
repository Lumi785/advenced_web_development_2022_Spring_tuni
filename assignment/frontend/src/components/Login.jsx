/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/actionCreators/authActions';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = e => {
        console.log("handleSubmit called ...");
        e.preventDefault();
        const formData = new FormData(e.target);
        const credential = {email: formData.get('email'), password: formData.get('password')};
        console.log("cred = ", credential);
        dispatch(logIn(credential));
        setEmail('');
        setPassword('');
    }
    
    return(
        <div data-testid='login-component'>
            <h2>Login</h2>
            <form action="" data-testid='login-form' onSubmit={handleSubmit}>
                <label htmlFor='email-input'>Email</label>
                <input 
                data-testid='email-input' 
                type="text" 
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='user@example.com'
                required 
                />
                <br />
                <label htmlFor='password-input'>Password</label>
                <input 
                data-testid='password-input' 
                type="text" 
                name='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='password(at least 10 ch'
                required
                />
                 
                <br />
                <input type="submit" data-testid='login-button' value='Login'/>
                {/* <button type='submit'data-testid='login-button' >Login</button> */}
            </form>
        </div>

    )
};

export default Login;
