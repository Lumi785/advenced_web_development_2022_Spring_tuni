/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getUsers } from '../redux/actionCreators/usersActions';
import User from './User';


const selectUsers = state => state.users;

const Users = () => {
     
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        
        if (users.length === 0){
            dispatch(getUsers());
        }
        
    }, []);

    //Note here here cannot print out users if they are get by getUsers()
    console.log("users = ", users);

    
    return(
        users.length>0 ? 
        (

        <div data-testid='users-component'>
            <ul data-testid='users-container'>
                {
                users.map(user => 
                    <User 
                        providedUser={user} 
                        
                        key={user.id}
                        name={user.name}
                
                    />)}
                
            </ul>

        </div>
        ) : (
            <></>
        )
    )
};

export default Users;
