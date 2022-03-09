/** @format */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Notification from './components/Notification';
import Register from './components/Register';
import User from './components/User';
import UserModifier from './components/UserModifier';
import Users from './components/Users';
import Auth from './components/Auth';
import Order from './components/Order';
import Orders from './components/Orders';
import Products from './components/Products';
import Product from './components/Product';
import ProductModifier from './components/ProductModifier';
import Finder from './components/Finder';
import { getOrder } from './redux/actionCreators/ordersActions';
import { getProduct } from './redux/actionCreators/productsActions';
import { getUser } from './redux/actionCreators/usersActions';
import { initApp } from './redux/actionCreators/appActions';


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initApp());
	}, []);

	const searchUsers = Finder('user', getUser);
	const searchProducts = Finder('product', getProduct);
	const searchOrders = Finder('order', getOrder);

	const authAdminComponent = Auth(['admin']);
	const authCustomerComponent = Auth(['customer']);
	const authComponent = Auth(['guest']);
	


	return (
		<div data-testid='app-component'>
			<nav>
				<Navbar/>
			</nav>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route element={<Notification/>}/>
				<Route element={searchUsers}/>
				<Route element={searchProducts}/>
				<Route element={searchOrders}/>


				

				<Route path='/users' element={<Users/>} />
				<Route path='/users/:userId' element={<User/>} />
				<Route path='/users/:userId/modify' element={<UserModifier/>} />
				<Route path='/products' element={<Products/>} />
				<Route path='/products/:productId' element={<Product/>} />
				<Route path='/products/:productId/modify' element={<ProductModifier/>} />
				<Route path='/cart' element={<Cart/>} />
				<Route path='/orders' element={<Orders/>} />
				<Route path='/orders/:orderId' element={<Order/>} />
				<Route path='/register' element={<Register/>} />
				<Route path='/login' element={<Login/>} />
				<Route path='/*' element={<NotFound/>} />

			</Routes>
			<footer>
				<p>Copyright &copy; 2022</p>
			</footer>
		</div>
	);
};

export default App;
