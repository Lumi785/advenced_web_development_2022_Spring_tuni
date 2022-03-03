/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/actionCreators/ordersActions';
import Order from './Order';

const seletOrders = state => state.orders;
const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(seletOrders);
    console.log("orders = ", orders);

    useEffect(() => {
        if(orders.length === 0){
            dispatch(getOrders());
        }
    }, []);


    return(

        <div data-testid='orders-component'>
            <ul data-testid='orders-container'>
                {orders.map(order => <Order providedOrder={order} key={order.id}></Order>)}
            </ul>
        </div>

    )



};

export default Orders;
