/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actionCreators/usersActions';
import User from './User';



const selectUsers = state => state.users;
const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        users.length === 0 ? dispatch(getUsers()) : {};
        
    }, [])

    //Note here here cannot print out users if they are get by getUsers()
    //console.log("users = ", users);


    return(
        
        <div data-testid='users-component'>
            <ul data-testid='users-container'>
                {users.map(user => {<User 
                    providedUser={user} 
                    id='user-component'
                    key={user.id}

                    />})}
                
            </ul>

            {/* <ol id='players-list'>
		
                {players.map(player => <PlayerLink key={player.id} name={player.name} 
                player={player} id={'player-' + player.id} url={'/api/players/' + player.id}/>)}
               
		    </ol> */}
        </div>
    )
};

export default Users;
