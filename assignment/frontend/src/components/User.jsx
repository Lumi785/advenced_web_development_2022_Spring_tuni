/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removeUser} from '../redux/actionCreators/usersActions';

const selectAuth = state => state.auth;

const selectUsers = state => state.users;


const User = ({ providedUser}) => {

    const dispatch = useDispatch();

    const auth = useSelector(selectAuth);
    const users = useSelector(selectUsers);
    
    let navigate = useNavigate();
    let {userId: userId_param} = useParams();

    
    //console.log("aa == ", userId_param);

    
    const userFromPath = userId_param ? 
        users.filter(user => user.id === userId_param)[0] :  null;


    const userToUse = providedUser ? providedUser : userFromPath;
    
    
    function handleDelete(userid){
        
        dispatch(removeUser(userid));
    }

    const modifyPath = providedUser ? `${userToUse.id}/modify` : 'modify';

    const idToUse = userId_param ? userId_param : providedUser.id;



    return (
        <li data-testid='user-component'>
            <h3 data-testid='name-heading'>{userToUse.name}</h3>

            {
                providedUser && 
            
            (<Link to={`/${providedUser.id}`} data-testid='inspect-link' 
            >Inspect</Link>)
            }

            
            <div data-testid='email-element'>Email: {userToUse.email}</div>
            <div data-testid='role-element'>Role: {userToUse.role}</div>

            {(providedUser || (!providedUser && auth.id !== idToUse)) && 
            
                <>
                    <button 
                    data-testid={'modify-button-' + userToUse.id} 
                    onClick={() => navigate(modifyPath)}
                    >Modify</button>
                    <button 
                    data-testid={'delete-button-' + userToUse.id} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(idToUse);
                        console.log("user id = ", idToUse);
                    }}
                    >Delete</button>
                </>
        
            }
       
    </li>) 

};

export default User;


 {/* Note: 1.This is how to use dynamic url in Link(different than in route)
                2. here to= '/id' is not the same as document '/users/id'  */}
