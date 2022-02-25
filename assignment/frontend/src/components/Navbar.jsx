/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/actionCreators/authActions';

const AllLinks = {
	admin: ['Orders', 'Users'],
	customer: ['Orders', 'Cart'],
	guest: ['Cart', 'Login', 'Register'],
};
/**
 * @component
 *
 */

const selectAuth = state => state.auth;
const Navbar = () => {
	console.log("apple ...")
	const auth = useSelector(selectAuth);
	console.log("auth from navbar = ", auth);

	const dispatch = useDispatch();

	function handleLogout(e){
		e.preventDefault();
		dispatch(logOut());

	}

	switch(auth.role){
		case 'customer':
			return (

				<div data-testid='navbar-component'>
					
				
					<Link data-testid='home-link' to='/'>Home  </Link>
					<Link data-testid='products-link' to='/products'>Product  </Link>
					<Link data-testid='orders-link' to='/orders'>Orders  </Link>
					<Link data-testid='cart-link' to='/cart'>Cart  </Link>
					<Link data-testid='logout-link' to='/logout' onClick={handleLogout}>Log Out</Link>
					
				</div>
			)
			
		case 'admin':
			return (
				<div data-testid='navbar-component'>
					<Link data-testid='home-link' to='/'>Home  </Link>
					<Link data-testid='products-link' to='/products'>Product  </Link>
					<Link data-testid='orders-link' to='/orders'>Orders  </Link>
					<Link data-testid='users-link' to='/users'>Users  </Link>
					<Link data-testid='logout-link' to='/logout' onClick={handleLogout}>Log Out</Link>
				</div>

			)

		case 'guest':
			case 'admin':
				return (
					<div data-testid='navbar-component'>
						<Link data-testid='home-link' to='/'>Home  </Link>
						<Link data-testid='products-link' to='/products'>Products  </Link>
						<Link data-testid='cart-link' to='/cart'>Cart  </Link>
						<Link data-testid='login-link' to='/login'>LogIn  </Link>
						<Link data-testid='register-link' to='/register'>Register  </Link>
					</div>

				)
		default:
			return (

				<div data-testid='navbar-component'>
					
				
					<Link data-testid='home-link' to='/'>Home  </Link>
					<Link data-testid='products-link' to='/products'>Products  </Link>
					<Link data-testid='cart-link' to='/cart'>Cart  </Link>
					<Link data-testid='login-link' to='/login'>LogIn  </Link>
					<Link data-testid='register-link' to='/register'>Register  </Link>
					
				</div>
			)
	}
	
}


export default Navbar;
