/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const selectAuth = state => state.auth;
const selectOrders = state => state.orders;

const Order = ({ providedOrder }) => {
    const auth = useSelector(selectAuth);
    // console.log(" auth =  ", auth);

    const orders = useSelector(selectOrders);
    // console.log("orders === ", orders);

    const {orderId} = useParams();
    // console.log("orderId ===== ", orderId);


    // console.log("provided order = ", providedOrder);
   

    const workingOrder = orders.find(order => order.id === orderId);
    // console.log("working order === ", workingOrder);
    let orderToUse;
    if (providedOrder){
        orderToUse = providedOrder;
    } else if (!providedOrder && workingOrder){
        orderToUse = workingOrder;
    } else {
        orderToUse = null;
    }

    const orderItems = orderToUse.items;
    // console.log("order  Items = ", orderItems);

   

    const idToUse = orderId ? orderId : providedOrder.id;






    return(

        orderToUse ?  (

            <div data-testid='order-component'>
                <h2 data-testid='orderId-heading'>{orderToUse.id}</h2>
                {!orderId && 
                <Link to={`/${orderToUse.id}`} data-testid='inspect-link' />
                }
                
                    
                
                <ol data-testid='order-list' >
                    { 
                        orderItems.map(item => {

                            return (

                                <li data-testid='order-listitem' key={item.product.id}>
                                    <h3 data-testid='name-heading'>{item.product.name}</h3>
                                    <div data-testid='price-element'>{item.product.price}</div>
                                    <div data-testid='description-element'>{item.product.description}</div>
                                    <div data-testid='quantity-element'>{item.quantity}</div>
                                </li>
                            )

                        })
                    }
                </ol>
                <h2 data-testid='customerId-heading'>{orderToUse.customerId}</h2>
                
                
            </div>
        ) : <></>
    )
};

export default Order;


//Note: array.map(item => {return ....})  //use return if use {}
// array.map(item => ....)
