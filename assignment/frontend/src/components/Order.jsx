/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Order = ({ providedOrder }) => {
    console.log("rpdodedorder = ", providedOrder.items);
    const orderItems = providedOrder.items;

    function switchLink(){
        console.log("apple");

    }


    return(
        <div data-testid='order-component'>
            <div data-testid='order-id'>{providedOrder.id}</div>
            <div data-testid='order-customer-id'>{providedOrder.customerId}</div>
            <a href="" data-testid='inspect-link' onClick={switchLink}></a>
            {/* <Link to={} data-testid='inspect-link'></Link> */}
            <div>

            {
             orderItems.map(item => 
             <ol data-testid='order-listitem' key={item.id}>{item.name}</ol>
             
             
             )
          }
            </div>


        </div>
    )
};

export default Order;
