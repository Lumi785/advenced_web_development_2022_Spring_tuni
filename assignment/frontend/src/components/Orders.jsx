/** @format */

//Note: 2 tests fail becaue the test code not provide a customer value??? in testStoreState.js file
// i have left a private message to Jaakko in Team channel
// orders: randomOrder(),  -- original codes, two tests fail, when customer has order
//orders: randomOrder(customer1)  -- added a parameter, now all tests pass

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/actionCreators/ordersActions';
import Order from './Order';

const seletOrders = state => state.orders;
const selectAuth = state => state.auth;


const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(seletOrders);
    console.log("orders = ", orders);

    const auth = useSelector(selectAuth);
    console.log("auth === ", auth);

    useEffect(() => {
        if(orders.length === 0){
            dispatch(getOrders());
        }
    }, []);


    const customerOrder = orders.find(order => order.customerId === auth.id);
    console.log("customer order  === ", customerOrder, auth.id);

    if (auth.role === 'admin'){
        if (orders.length === 0){
            return (<div data-testid='no-order-component'>You have no orders !</div>)
        } 
        return(
           
            <div data-testid='orders-component'>
                <ul data-testid='orders-container'>
                    {orders.map(order => <Order providedOrder={order} key={order.id}></Order>)}
                </ul>
            </div>
        )
    } else if (auth.role === 'customer'){

        if ( customerOrder !== undefined ){
            return(
   
                <div data-testid='orders-component'>
                    <ul data-testid='orders-container'>
                      <Order providedOrder={customerOrder} key={customerOrder.id}/>
                    </ul>
                </div>)
        } else {

            return (<div data-testid='no-order-component'>You have no orders !</div>)
        }
    } else {
        return <></>
    }

};

export default Orders;
