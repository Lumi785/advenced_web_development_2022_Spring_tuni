/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const selectAuth = state => state.auth;

const Auth = ({ authRoles }) => {
    const [auth, setAuth] = useState('');
    setAuth(useSelector(selectAuth));

    console.log("authorolss = ", authRoles);


    useEffect(() => {
        if (authRoles[0] === 'admin'){
            console.log("i am admin");
        } else if (authRoles[0] === 'guest'){
            console.log("im am guest");
        }



    }, [auth])

    



    return(
        <div data-testid='auth-success-component'>
            hello
        </div>

    )
};

export default Auth;
