/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createNotification } from '../redux/actionCreators/notificationsActions';
import { addOrder } from '../redux/actionCreators/ordersActions';
import CartItem from './CartItem';

const selectCart = state => state.cart;

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    console.log("cart === ", cart);

    return(
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
                    <button data-testid='order-button'>Order</button>
                </>
            }

        </div>
    )

};

export default Cart;
