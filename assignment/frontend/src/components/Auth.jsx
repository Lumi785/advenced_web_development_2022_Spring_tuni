/** @format */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Auth = ({ authRoles }) => {
    console.log("authorolss = ", authRoles);



    return(
        <div data-testid='auth-success-component'>
            hello
        </div>

    )
};

export default Auth;
