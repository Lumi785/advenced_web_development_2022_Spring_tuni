/** @format */

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const selectUsers = state => state.users;
const selectProducts = state => state.products;
const selectOrders = state => state.orders;


const Finder = ({ type, findHandler }) => {
    console.log("finder called ...");
    //const [term, setTerm] = useState('');


    const dispatch = useDispatch();

    const users = useSelector(selectUsers);
    const products = useSelector(selectProducts);
    console.log("products = ", products);
    const orders = useSelector(selectOrders);

    const incomeIdObj = useParams();


    // useEffect(() => {
    let displayItem = null;

        if (type === 'product'){
            const id = incomeIdObj.productId;
            displayItem = products.find(product => product.id === id);
            console.log("found product is = ", displayItem);
            if (!displayItem){
                dispatch(findHandler(id));
            };
            //setTerm(displayItem);
        };
        if (type === 'user'){
            const id = incomeIdObj.userId;
            displayItem = users.find(user => user.id === id);
    
           
            if (!displayItem){
                dispatch(findHandler(id));
            };
            //setTerm(displayItem);

            
        };
        if (type === 'order'){
            const id = incomeIdObj.orderId;
            displayItem = orders.find(order => order.id === id);
            
            if (!displayItem){
                dispatch(findHandler(id));
            };
            //setTerm(displayItem);

        };

    // }, []);

  
    if (displayItem){
        return <div data-testid={`${type}-found-component`}>
        {<Outlet/>}
    </div>
    } else {
        return <div data-testid={`no-${type}-found-component`}>
        {type} not found.
    </div>
    }

    // return(
    //     <>  
            
    //         {
    //             {displayItem} === undefined && 
    //             <div data-testid={`no-${type}-found-component`}>
    //                 {type} not found.
    //             </div>
    //         }

    //         {
    //             {displayItem} && 
    //             <div data-testid={`${type}-found-component`}>
    //                 {<Outlet/>}
    //             </div>
    //         }
    //     </>
    // )
    
};

export default Finder;


//commented out codes not working
