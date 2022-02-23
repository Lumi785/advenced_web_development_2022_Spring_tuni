/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actionCreators/authActions';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = e => {
        //console.log("handleSubmit called ...");
        e.preventDefault();
        const formData = new FormData(e.target);
        const credential = {email: formData.get('email'), password: formData.get('password'), confirmPassword: formData.get('confirmPassword')};
        //console.log("cred = ", credential);
        dispatch(register(credential));
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return(

        <div data-testid='register-componen'>
            <h2>Register</h2>
            <form action="" data-testid='register-form' onSubmit={handleSubmit}>
                <label htmlFor='name-input'>Name</label>
                <input 
                    type="text" 
                    data-testid='name-input' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='John Doe'
                    required 
                />
                <br />
                <label htmlFor='email-input'>Email</label>
                <input 
                    type="email" 
                    data-testid='email-input' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='user@example.com'
                    required 
                />
                <br />
                <label htmlFor='password-input'>Password</label>
                <input 
                    type="password" 
                    data-testid='password-input' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='password(at least 10 characters)'
                    required 
                />
                <br />
                <label htmlFor='passwordConfirmation-input'>Password confirmation</label>
                <input 
                    type="password" 
                    data-testid='passwordConfirmation-input' 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder='password confirmation'
                    required 
                />
                <br />
                <input 
                    type="submit" 
                    data-testid='register-button' 
                    value='Register' 
                    required
                />
            </form>
        </div>
    )
};

export default Register;
