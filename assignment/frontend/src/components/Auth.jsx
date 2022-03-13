/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from "react-router-dom";


const selectAuth = state => state.auth;

const Auth = ({ authRoles }) => {

    const auth = useSelector(selectAuth);
    const navigate = useNavigate();




    const rolesToUse = authRoles ? authRoles : null;
    console.log("Auth compoenent use effect: ", authRoles, auth.role);
    if (rolesToUse && rolesToUse.includes(auth.role)){
                console.log("correct auth role, render children");
                return  <div data-testid='auth-success-component'>
                            <h1> authentication passed</h1>
                            <Outlet /> 
                        </div>
                
            } else {
                if (auth.role === 'guest'){
                    return <Navigate to="/login" />;
                } else {
                    return <Navigate to="/" />;
                }
                // return <div>authentication is wrong!</div>
                
            }
        

//     let content = <></>;

//    useEffect(() => {

//     console.log("Auth compoenent use effect: ", authRoles, auth.role);

//     if (rolesToUse && rolesToUse.includes(auth.role)){
//         console.log("correct auth role, render children");


//         content = <div data-testid='auth-success-component'>
//                 <Outlet /> 
//         </div>
//         return;
//     } else {
//         if (auth.role === 'guest'){
//             console.log("navigate to /login");
//             content = <Navigate to="/login" />;
//             return;
//         }
//     }

    // if ((rolesToUse && !rolesToUse.includes(auth.role)) || !rolesToUse){
    //     console.log("navigate to /");
    //     return <Navigate to="/" />;
    // } else {
    //     if (auth.role === 'guest'){
    //         console.log("navigate to /register");

    //         return <Navigate to="/register" />;
    //     } 
    //     if (auth.role === 'customer' || auth.role === 'admin'){
    //         console.log("correct auth role, render children");

    //         return <div data-testid='auth-success-component'>
    //             <Outlet /> 
    //         </div>
    //     }    
    //}
//     console.log("fallback to default");

//     content = <Navigate to="/" />;
// }, []);

//     return content;



/*    const auth = useAuth();
    return auth ? 
        <div data-testid='auth-success-component'>
            <Outlet /> 
        </div>
    : <Navigate to="/login" />;
    */


/*
    const aa = useParams();
   
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(false);
    
    const auth = useSelector(selectAuth);

    const rolesToUse = authRoles ? authRoles : null;

   useEffect(() => {

        if ((rolesToUse && !rolesToUse.includes(auth.role)) || !rolesToUse){
            
            setAuthState(false);
            navigate('/');

        } else {
            if (auth.role === 'guest'){
                navigate('/login');
                setAuthState(false);
            } 
            if (auth.role === 'customer' || auth.role === 'admin'){

                setAuthState(true);
            }    
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
    */
};

export default Auth;
