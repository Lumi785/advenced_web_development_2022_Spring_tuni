/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removeUser, updateUser} from '../redux/actionCreators/usersActions';



const User = ({ providedUser, userID }) => {
    let navigate = useNavigate();
    let {userId} = useParams();
    console.log("uuuuuser id = "  , userId)

    const dispatch = useDispatch();
    console.log("providedUser = ", providedUser);

    function handleDelete(e){
        e.preventDefault();
        dispatch(removeUser(userID));
        console.log("delete user button clicked");

    }

    // removeUser, par id
    // updateUser, par user object 

    function handleModify(e){
        e.preventDefault();
        dispatch(updateUser(providedUser));
        console.log("modify user button clicked");

    }

    function disPlayUserInfo(){
        console.log("disPlayUserInfo called ...");

    }


    return(providedUser &&
        <li >
            <div data-testid='name-heading'>{providedUser.name}</div>
            
            {/* <Link to='/users' data-testid='inspect-link' onClick={()=>navigate('/users/:userId')}></Link> */}

            <div data-testid='user-email'>{providedUser.email}</div>
            <div data-testid='user-role'>{providedUser.role}</div>
            {
                providedUser.role !== 'adimin' && 
            (<>
            <button data-testid={'modify-button-' + userID} onClick={handleModify}>Modify</button>
            <button data-testid={'modify-button-' + userID} onClick={handleDelete}>Delete</button>
            </>
            )
            }
        </li>
    //     <li role="listitem" id={id}>
		  
	// 	<a href={url} role="link" onClick={onClick} 
	// 		>{name}</a>
	//   </li>
    )
};

export default User;
