/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createNotification } from '../redux/actionCreators/notificationsActions';
import { addOrder } from '../redux/actionCreators/ordersActions';
import CartItem from './CartItem';

const selectCart = state => state.cart;
const selectAuth = state => state.auth;

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const auth = useSelector(selectAuth);
   // console.log("cart from handleOrder === ", cart);
    // console.log("auth === ", auth);

    function handleOrder(){
        
        if (auth.role === 'customer'){
            const cartWithoutImage = cart.map(item => delete(item.product.image));
            //console.log("cartWithoutImage = ", cartWithoutImage);

            const newOrder = {
                // customerId: auth.id,
                items : cart
            };
            console.log("new order = ", newOrder);
            dispatch(addOrder(newOrder));
        }
        if (auth.role === 'guest'){
            const newNotification = {
                message: 'Login please',
                isSuccess: false
            };
            navigate('/login');
            dispatch(createNotification(newNotification));
        }
    }

    return(
        <>
            {auth.role !== 'admin' && 
            
                <div data-testid='cart-component'>
                    {
                        cart.length === 0 && 
                        <div data-testid='empty-cart'>Cart is empty !</div>
                    }

                    {
                        cart.length > 0 &&
                        <>
                            <div data-testid='cart-item-container'>
                                

                                    {
                                        cart.map(item => 
                                            <CartItem 
                                                item={item} 
                                                key={item.product.id}
                                                
                                            />)
                                    }
                                
                                
                            </div>
                            <button 
                                data-testid='order-button'
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        handleOrder();
                                    }
                                }
                                >Order
                            </button>
                        </>
                    }

                </div>
            }
        
        
        
        </>
        
    );

};

export default Cart;
