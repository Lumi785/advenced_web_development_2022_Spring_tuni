/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actionCreators/productsActions';
import Product from './Product';
import ProductAdder from './ProductAdder';

const selectProducts = state => state.products;

const Products = () => {
    const [adderCondition, setAdderCondition] = useState(false);

    function onOrOff(){
        if (adderCondition === true){
            return 'On';
        } else {
            return 'Off';
        }
    }
    function toggleAdderCondition(){
        return setAdderCondition(!adderCondition);
    }
    let aa = onOrOff();

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    console.log("products == ", products);

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
                toggleAdderCondition();
            }}
            >{aa}
            </button>

            <ul data-testid='products-container'>

                {products.map(product => <Product key={product.id} name={product.name} 
                providedProduct={product} />)}
                    
            </ul> 
        </div>
    )

};

export default Products;
