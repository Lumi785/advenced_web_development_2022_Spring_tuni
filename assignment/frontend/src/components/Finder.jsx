/** @format */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const Finder = ({ type, findHandler }) => {

    console.log("type = ", type);


    return(
        <>
        <div data-testid='no-:type-found-component'>
            :type not found
        </div>
        <div data-testid=':type-found-component'>
            :type
        </div>
        </>
    )
};

export default Finder;
