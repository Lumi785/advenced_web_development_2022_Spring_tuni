/** @format */

//note: one test not pass, becaue the test code has problem, have informed Jaakko in Team channel"

//expect(utils.getByTestId(element)).toHaveValue(value); --original code test type='text' for input working
//expect(utils.getByTestId(element).value).toBe(value); -- also working for type='number' for input 

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProduct } from '../redux/actionCreators/productsActions';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const selectProducts = state => state.products;
const ProductModifier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(selectProducts);
    const {productId} = useParams();

    const product = products.find(prd => prd.id === productId);
    console.log("product == ", product);

    const [inputName, setInputName] = useState(product.name);
    const [inputPrice, setInputPrice] = useState(product.price);
    const [inputDescription, setInputDescription] = useState(product.description);
    const [inputImage, setInputImage] = useState(product.image);


    

    console.log("input name = ", inputName);
    console.log("input price = ", inputPrice);
    console.log("input description = ", inputDescription);
   
    function handleUpdate(){
        const newObj = {
            id: productId,
            name: inputName,
            price: inputPrice,
           
            description: inputDescription,
        }
        console.log("newObj = ", newObj);

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
                    value={productId} 
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
                    data-testid='image-input'
                    value={inputImage} 
                    name='inputImage'
                    onChange={e => setInputImage(e.target.value)}
                    
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
