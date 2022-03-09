/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const selectAuth = state => state.auth;

const Auth = ({ authRoles }) => {

   

    const aa = useParams();
    console.log("aa = ", aa);
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(false);
    
    const auth = useSelector(selectAuth);

    const rolesToUse = authRoles ? authRoles : null;

   useEffect(() => {

        

        if (!rolesToUse.includes(auth.role)){
            
            setAuthState(false);
            navigate('/');

        } else {
            if (auth.role === 'guest'){
                navigate('/login');
                setAuthState(false);
            } 
            setAuthState(true);
           
            
        }
       
   }, [auth]);


 





    



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
