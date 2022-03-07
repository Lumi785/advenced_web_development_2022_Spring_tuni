/** @format */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const selectUsers = state => state.users;
const selectProducts = state => state.products;
const selectOrders = state => state.orders;

const Finder = ({ type, findHandler }) => {
    const [hasThingToDisplay, setHasThingToDisplay] = useState(false);
    const dispatch = useDispatch();

    const users = useSelector(selectUsers);
    const products = useSelector(selectProducts);
    const orders = useSelector(selectOrders);

    const incomeIdObj = useParams();
    console.log("incomeIdObj = ", incomeIdObj);

    console.log("type = ", type);
    console.log('findHander = ', findHandler);

    let disPlayItem;

    if (type === 'product'){
        const id = incomeIdObj.productId;
        disPlayItem = products.find(product => product.id === id);
        console.log("pppppp = ", disPlayItem);
        useEffect(() => {
            if (!disPlayItem){
                dispatch(findHandler(id));
            }
        }, []);
    }
    if (type === 'user'){
        const id = incomeIdObj.userId;
        disPlayItem = users.find(user => user.id === id);
        console.log("uuuuuu = ", disPlayItem);
        useEffect(() => {
            if (!disPlayItem){
                dispatch(findHandler(id));
            }
        }, []);
    }
    if (type === 'order'){
        const id = incomeIdObj.orderId;
        disPlayItem = orders.find(order => order.id === id);
        console.log("oooooo = ", disPlayItem);
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
  
    console.log("itemToUse item = ", itemToUse);
    







    return(
        <>
         {
            !itemToUse && 
            <div data-testid={`no-${type}-found-component`}>
                {type} not found
            </div>
         }

        {
            itemToUse && 
            <div data-testid={`${type}-found-component`}>
                
            </div>
        }
        </>
    )
};

export default Finder;
