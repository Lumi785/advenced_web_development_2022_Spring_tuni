/** @format */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const selectUsers = state => state.users;
const selectProducts = state => state.products;
const selectOrders = state => state.orders;

const Finder = ({ type, findHandler }) => {
    const dispatch = useDispatch();

    const users = useSelector(selectUsers);
    const products = useSelector(selectProducts);
    const orders = useSelector(selectOrders);

    const incomeIdObj = useParams();

    let disPlayItem;

    if (type === 'product'){
        const id = incomeIdObj.productId;
        disPlayItem = products.find(product => product.id === id);

        useEffect(() => {
            if (!disPlayItem){
                dispatch(findHandler(id));
            }
        }, []);
    }
    if (type === 'user'){
        const id = incomeIdObj.userId;
        disPlayItem = users.find(user => user.id === id);

        useEffect(() => {
            if (!disPlayItem){
                dispatch(findHandler(id));
            }
        }, []);
    }
    if (type === 'order'){
        const id = incomeIdObj.orderId;
        disPlayItem = orders.find(order => order.id === id);
        
        useEffect(() => {
            if (!disPlayItem){
                dispatch(findHandler(id));
            }
        }, []);
    }

    let itemToUse;

    if (disPlayItem){
        itemToUse = disPlayItem;
    } else {
        disPlayItem = undefined;
    }
  

    return(
        <>
            {
                itemToUse === undefined && 
                <div data-testid={`no-${type}-found-component`}>
                    {type} not found.
                </div>
            }

            {
                itemToUse && 
                <div data-testid={`${type}-found-component`}>
                    <Outlet/>
                </div>
            }
        </>
    )
};

export default Finder;
