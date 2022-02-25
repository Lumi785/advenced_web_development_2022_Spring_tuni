/** @format */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../redux/actionCreators/productsActions';

const ProductAdder = ({ open, openHandler }) => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(null);
    // const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newProduct = {name: formData.get('productName'), price: formData.get('productPrice'),
                            description: formData.get('productDescription')};
        console.log("newProduct = ", newProduct);
        dispatch(addProduct(newProduct));
        setProductName('');
        setProductPrice(null);
        setProductDescription('');
    }


    return(
        <form action="" data-testid='product-adder-component' onSubmit={handleSubmit}>
            <input 
                type="text" 
                data-testid='name-input' 
                value={productName}
                name='productName'
                onChange={e => setProductName(e.target.value)}
                required
            />
            <input 
                type="number" 
                data-testid='price-input' 
                value={productPrice}
                name='productPrice'
                onChange={e => setProductPrice(e.target.value)}
                required
            />
            {/* <input 
                type="text" 
                data-testid='image-input' 
                value={productImage}
                name='productImage'
                required
            /> */}
            <input 
                type="text" 
                data-testid='description-input' 
                value={productDescription}
                name='productDescription'
                onChange={e => setProductDescription(e.target.value)}
                required
            />
            <button data-testid='add-button' type='submit'>Add product</button>
            <button data-testid='cancel-button' type='button' onClick={openHandler}>Cancel</button>
        </form>


    )
};

export default ProductAdder;
