/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removeUser} from '../redux/actionCreators/usersActions';

const selectAuth = state => state.auth;


const User = ({ providedUser}) => {


    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    console.log("auth from User.jsx = ", auth);
    
    let navigate = useNavigate();

    let {userId} = useParams();
    console.log("aa == ", userId);



    function handleDelete(e){
        e.preventDefault();
        
        const id = providedUser.id;
        dispatch(removeUser(id));
        
        console.log("delete user button clicked");

    }


    return (

        providedUser?(

        <li data-testid='user-component'>
            <h3 data-testid='name-heading'>{providedUser.name}</h3>

        <Link to='/:userId' data-testid='inspect-link' 
        >Inspect</Link>
      
        {/* <Link to='/users' data-testid='inspect-link' 
        onClick={()=>navigate(`/users/${providedUser.id}`)}>Inspect</Link>
       */}
        
        

        <div data-testid='email-element'>Email: {providedUser.email}</div>
        <div data-testid='role-element'>Role: {providedUser.role}</div>
        
        {
            auth.id !== providedUser.id && 

            <>
                <button 
                data-testid={'modify-button-' + providedUser.id} 
                onClick={() => navigate(`/users/${providedUser.id}/modify`)}
                >Modify</button>
                <button data-testid={'delete-button-' + providedUser.id} onClick={handleDelete}>Delete</button>
            </>
        }
        
    </li>) : (
            <></>
        )

    )
    

};

export default User;
