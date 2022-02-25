/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addCartItem,
	incrementCartItem,
} from '../redux/actionCreators/cartActions';

const Product = ({ providedProduct }) => {
	console.log("providedProduct = ", providedProduct);

	return(
		<li data-testid='product-component'>
			

			<div data-testid='name-header'>{providedProduct.name}</div>
			<div>{providedProduct.id}</div>
			
			
		</li>
	)



};

export default Product;
