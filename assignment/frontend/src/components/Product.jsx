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

	const cart = useSelector(selectCart);

	const {productId} = useParams();

	function handleDelete(id){
		dispatch(deleteProduct(id));
	}

	function handleIncrementCartItem(productId){
		dispatch(incrementCartItem(productId));
	}

	function handleAddCartItem(product){
		dispatch(addCartItem(providedProduct))
	}

	const productFromPath = productId ? 
		produts.filter(prd => prd.id === productId)[0] :  null;

	const productToUse = providedProduct ? providedProduct : productFromPath;

	const idToUse = productToUse ? productToUse.id : null;
	const nameToUse = productToUse ? productToUse.name : null;
	const descriptonToUse = productToUse ? productToUse.description : null;
	const priceToUse = productToUse ? productToUse.price : null;


	//note: here must use providedProduct? Not productToUse?
    const modifyPath = providedProduct ? `${idToUse}/modify` : 'modify';

	/**
	 * 
	 * @param {*} product 
	 * @returns bool, true if product in cart, else return false
	 */
	function isProductInCart(product){
		const productArray = cart === undefined? [] : cart.filter(item => item.product.id === product.id);
		return productArray.length > 0;
	}
	

	/**
	 * 
	 * @param {*} product 
	 */
	function addProductToCart(product){
		if (isProductInCart(product)){
			handleIncrementCartItem(product.id);
		} else {
			handleAddCartItem(product);

		}
	}
	

	return(
		<li data-testid='product-component'>
			
		
		
			<div data-testid='name-header'>{nameToUse}</div>
			<div data-testid='description-element'>{descriptonToUse}</div>
			<div data-testid='price-element'>{priceToUse}</div>
	

			{auth.role === 'admin' && productToUse &&
				<>
					<button 
						data-testid={'delete-button-' + idToUse}
						onClick={
							(e) => {e.preventDefault();
							handleDelete(idToUse);
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
						addProductToCart(productToUse);

					}}
					>Add to cart
				</button>
			}
			
		</li>
	)
};

export default Product;
