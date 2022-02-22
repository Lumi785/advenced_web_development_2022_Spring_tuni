/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actionCreators/usersActions';
import User from './User';

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("ursers = ", users);
        console.log("no users pppppppp")
        if (users.length === 0){
            const users = dispatch(getUsers);
        }
    }, [])

    const users = useSelector((state) => state.users)




    return(
        <div data-testid='users-component'>
            <ul data-testid='users-container'>
                {users.map(user => {<User providedUser={user} data-testid='user-component'/>})}
                
            </ul>
        </div>
    )
};

export default Users;
