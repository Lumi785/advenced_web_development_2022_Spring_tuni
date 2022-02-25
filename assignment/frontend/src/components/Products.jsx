/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actionCreators/productsActions';
import Product from './Product';
import ProductAdder from './ProductAdder';

const selectProducts = state => state.products;

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    console.log("products == ", products);

    useEffect(() => {
        
        if (products.length === 0){
            dispatch(getProducts());
        }
        
    }, []);

    return(
       <ol id='players-list'>
		
            {products.map(product => <Product key={product.id} name={product.name} 
            providedProduct={product} />)}
               
		</ol> 
    )

};

export default Products;
