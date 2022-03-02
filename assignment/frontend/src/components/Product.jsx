/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addCartItem,
	incrementCartItem,
} from '../redux/actionCreators/cartActions';
import {
	deleteProduct
} from '../redux/actionCreators/productsActions';




const selectAuth = state => state.auth;
const selectProducts = state => state.products;
const selectCart = state => state.cart;


const Product = ({ providedProduct }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const auth = useSelector(selectAuth);
	const produts = useSelector(selectProducts);

	const cartItems = useSelector(selectCart);
	console.log("cartItems = ", cartItems);

	const {productId} = useParams();
	console.log("productId = ", productId);

	function handleDelete(providedProduct){
		dispatch(deleteProduct(providedProduct));
	}

	function handleIncrementCartItem(productId){
		console.log(" handleIncrementCartItem called ...");
		dispatch(incrementCartItem(productId));
	}

	function handleAddCartItem(product){
		console.log(" handleAddCart item fun is called ...");
		dispatch(addCartItem(providedProduct))
	}
	const productFromPath = productId ? 
		produts.filter(prd => prd.id === productId)[0] :  null;

	const productToUse = providedProduct ? providedProduct : productFromPath;

	const idToUse = productId ? productId : providedProduct.id;


	//note: here must use providedProduct? Not productToUse?
    const modifyPath = providedProduct ? `${idToUse}/modify` : 'modify';

	/**
	 * 
	 * @param {*} product 
	 * @returns bool, true if product in cart, else return false
	 */
	function isProductInCart(product){
		console.log("isproductIn cart function called ...");
		console.log("cartItems.includes(product) =====  ", cartItems.includes(product));
		return cartItems.includes(product);
	}
	

	return(
		<li data-testid='product-component'>
			
		
		
			<div data-testid='name-header'>{productToUse.name}</div>
			<div data-testid='description-element'>{productToUse.description}</div>
			<div data-testid='price-element'>{productToUse.price}</div>
	

			{auth.role === 'admin' && 
				<>
					<button 
						data-testid={'delete-button-' + idToUse}
						onClick={
							(e) => {e.preventDefault();
							handleDelete(productToUse);
							}
						}
						>Delete
					</button>
					<button 
						data-testid={'modify-button-' + idToUse}
						onClick={() => navigate(modifyPath)}
						>
						Modify
					</button>
				</>
			}

			{auth.role === 'guest' && 
				<button 
					data-testid={'add-cart-button-'+ idToUse}
					onClick={e => {
						e.preventDefault();
						if (isProductInCart(productToUse)){
							handleIncrementCartItem(idToUse);
						}
						handleAddCartItem(productToUse);

					}}
					>Add to cart
				</button>
			}
			
		</li>
	)
};

export default Product;
