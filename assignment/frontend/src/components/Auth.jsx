/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const selectAuth = state => state.auth;

const Auth = ({ authRoles }) => {
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(false);
    
    const auth = useSelector(selectAuth);

   useEffect(() => {

    if (authRoles.includes(auth.role)){
        
        setAuthState(true);
        console.log("autSthate == ", authState);
        if (auth.role === 'guest'){
            navigate('/login');
        } 

    } else {
        setAuthState(false);
        console.log("autSthate == ", authState);
        navigate('/');
    }
       
   }, [auth]);


 


    const aa = useParams();
    console.log("aa = ", aa);



    



    return(
        <>
            {
                authState && 
                (
                    <div data-testid='auth-success-component'>
                        <Outlet/>
                    </div>
                )
            }

        </>

    )
};

export default Auth;
