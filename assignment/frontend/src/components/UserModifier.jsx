/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actionCreators/usersActions';
import { useNavigate, useParams } from 'react-router-dom';


// const selectAuth = state => state.auth;
const selectUsers = state => state.users;

const UserModifier = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const auth = useSelector(selectAuth);

    //Important !!! Use below two line find out what useParams return!!!
    // const aa = useParams();
    // console.log("aa == ", aa);
    const {userId} = useParams();
    const [btnCondition, setBtnCondition] = useState(true);
    
    const users = useSelector(selectUsers);
    const user = users.find(user => user.id === userId);
    console.log("user === ", user);
    const [workingRole, setWorkingRole] = useState(user.role);
    console.log("rose == ", workingRole);

    

    function handleModify(){
        if (user.role !== workingRole){
            setBtnCondition(false);
            const p = {role: workingRole};
            console.log("pppppp = ", p);
            setWorkingRole(workingRole);
            
            dispatch(updateUser(p));
            // navigate('/users');
        } else {
            setBtnCondition(true);
            
        }
    }

    function handleClick(){
      
        if (workingRole === user.role){
            setBtnCondition(true);
            navigate('/users');
        } else {
            setBtnCondition(false);
        }
    }
  

    
        
        

    


    return(
        <form 
            data-testid='user-modifier-component' 
            onSubmit={(e) => {
                e.preventDefault();
                handleModify();
            }}>

            <h3 data-testid='name-heading'>{user.name}</h3>

                <select name="" data-testid="role-select" value={workingRole} onChange={
                    (e) => {
                        e.preventDefault();
                        setWorkingRole(e.target.value);
                    }}>
                <option value="customer">customer</option>
                <option value="admin">admin</option>
            </select>

            <button 
                data-testid='update-button' 
                type='submit'
                
                disabled={btnCondition}
                onClick={
                    e => {
                        e.preventDefault();
                        handleClick();
                    }}
                >Update
            </button>


        </form>
    )
};

export default UserModifier;
