/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/actionCreators/usersActions';
import { useNavigate, useParams } from 'react-router-dom';


const selectAuth = state => state.auth;

const UserModifier = () => {
    const auth = useSelector(selectAuth);
    const [role, setRole] = useState('');
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [updateBtnCondition, setUpdateBtnCondition] = useState(false);

    function handleModify(e){
        e.preventDefault();
        dispatch(updateUser())
    }

    function handleChangeRole(e){
        e.preventDefault();
        setRole({value: e.target.value})
    }

    function activateUpdateBtn(e){
        e.preventDefault();
        setUpdateBtnCondition(true);
    }


    return(
        <form data-testid='user-modifier-component' onSubmit={handleModify}>

            <h3 data-testid='name-heading'>{name}</h3>

            <select name="" data-testid="role-select" value={role} onChange={handleChangeRole}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
            </select>

            <button 
                data-testid='update-button' 
                type='submit'
                onClick={handleModify, activateUpdateBtn}
                disabled={updateBtnCondition}

            >
                Update
            </button>


        </form>
    )
};

export default UserModifier;
