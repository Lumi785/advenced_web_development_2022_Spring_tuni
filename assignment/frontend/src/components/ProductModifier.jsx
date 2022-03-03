/** @format */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProduct } from '../redux/actionCreators/productsActions';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const selectProducts = state => state.products;
const ProductModifier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputName, setInputName] = useState('');
    const [inputPrice, setInputPrice] = useState('');
    const [inputDescription, setInputDescription] = useState('');

    const {productId} = useParams();

    const products = useSelector(selectProducts);

    const product = products.find(prd => prd.id === productId);
    console.log("product == ", product);
   
    function handleUpdate(){
        const newObj = {
            name: inputName,
            price: inputPrice,
            description: inputDescription
        }

        dispatch(updateProduct(newObj));
        navigate('/products');
    }




    return(
    
        <form data-testid='product-modifier-component' onSubmit={e => {
                                                                e.preventDefault();
                                                                handleUpdate();}}>
                <input 
                    type="text" 
                    data-testid='id-input' 
                    value={product.id} 
                    disabled
                />
                <input 
                    type="text" 
                    data-testid='name-input'
                    value={inputName} 
                    name='inputName'
                    onChange={e => setInputName(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    data-testid='price-input'
                    value={inputPrice} 
                    name='inputPrice'
                    onChange={e => setInputPrice(e.target.value)}
                    required
                />
                <input 
                    type="text" 
                    data-testid='description-input'
                    value={inputDescription} 
                    name='inputDescription'
                    onChange={e => setInputDescription(e.target.value)}
                    required
                />
                <button 
                    data-testid='update-button'
                    type='submit'
                    >Update
                </button>
                <button 
                    data-testid='cancel-button'
                    type='button'
                    onClick={
                        e => {
                            e.preventDefault();
                            navigate('/products');
                        }
                    }
                    >Update

                </button>



        </form>





    )
};

export default ProductModifier;
