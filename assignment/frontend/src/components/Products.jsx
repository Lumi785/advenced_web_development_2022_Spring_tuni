/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actionCreators/productsActions';
import Product from './Product';
import ProductAdder from './ProductAdder';

const selectProducts = state => state.products;
const selectAuth = state => state.auth;

const Products = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    function buttonText(){
        if (open === true){
            return 'Close';
        } else {
            return 'Open';
        }
    }

    let btnText = buttonText();

    function openHandler(){
        setOpen(false);
    }
    


    
    const products = useSelector(selectProducts);

    useEffect(() => {
        
        if (products.length === 0){
            dispatch(getProducts());
        }
        
    }, []);

    return(
        <div data-testid='products-component'>
            <button 
            data-testid='open-adder-button' 
            onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
            }}
            >{btnText}
            </button>

            {(auth.role === 'admin' && open === true) && 
            <ProductAdder open={open} openHandler={openHandler} />
            }

            <ul data-testid='products-container'>

                {products.map(product => <Product key={product.id} name={product.name} 
                providedProduct={product} />)}
                    
            </ul> 
        </div>
    )

};

export default Products;
