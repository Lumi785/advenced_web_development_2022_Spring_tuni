/** @format */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const selectUsers = state => state.users;
const selectProducts = state => state.products;
const selectOrders = state => state.orders;

const Finder = ({ type, findHandler }) => {
    const [term, setTerm] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(selectUsers);
    const products = useSelector(selectProducts);
    const orders = useSelector(selectOrders);

    const incomeIdObj = useParams();


    useEffect(() => {
        if (type === 'product'){
            const id = incomeIdObj.productId;
            const disPlayItem = products.find(product => product.id === id);
            if (!disPlayItem){
                dispatch(findHandler(id));
            };
            setTerm(disPlayItem);
        };
        if (type === 'user'){
            const id = incomeIdObj.userId;
            const disPlayItem = users.find(user => user.id === id);
    
           
            if (!disPlayItem){
                dispatch(findHandler(id));
            };
            setTerm(disPlayItem);

            
        };
        if (type === 'order'){
            const id = incomeIdObj.orderId;
            const disPlayItem = orders.find(order => order.id === id);
            
            if (!disPlayItem){
                dispatch(findHandler(id));
            };
            setTerm(disPlayItem);

        };

    }, []);

  

    return(
        <>  
            
            {
                term === undefined && 
                <div data-testid={`no-${type}-found-component`}>
                    {type} not found.
                </div>
            }

            {
                term !== undefined && 
                <div data-testid={`${type}-found-component`}>
                    <Outlet/>
                </div>
            }
        </>
    )
};

export default Finder;
