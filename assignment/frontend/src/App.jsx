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





	return (
		<div data-testid='app-component'>
			
			<Navbar/>
			<Notification/>
			<Routes>


				<Route path='/' element={<Home/>} />
				<Route path='*' element={<NotFound/>} />
				

				<Route path='/products' element={<Products/>} />

				<Route path="/products/:productId" element={<Finder type={'product'} findHandler=		{getProduct} />}>
					<Route path='' element={<Product/>}/>
				</Route>

				<Route path="/users/:userId" element={<Finder type={'user'} findHandler=		{getUser} />}>
					<Route path='' element={<User/>}/>
				</Route>
				
				<Route path="/orders/:orderId" element={<Finder type={'order'} findHandler=		{getOrder} />}>
					<Route path='' element={<Order/>}/>
				</Route>

		
	
				<Route path="/register" element={<Auth authRoles={['guest']} />}>
					<Route path='' element={<Register/>} />
				</Route>
			

				<Route path="/login" element={<Auth authRoles={['guest']} />}>
					<Route path='' element={<Login/>} />
				</Route>


				<Route path="/cart" element={<Auth authRoles={['guest', 'customer']} />}>
					<Route path='' element={<Cart/>} />
				</Route>


				
				<Route path="/orders" element={<Auth authRoles={['customer', 'admin']} />}>
					<Route path='' element={<Orders/>} />
				</Route>

				<Route path="/orders/:orderId" element={<Auth authRoles={['customer', 'admin']} />}>
					<Route path='' element={<Order/>} />
				</Route>

			
				<Route path="/users" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<Users/>} />
				</Route>
			
				
				<Route path="/users/:userId" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<User/>} />
				</Route>
				<Route path="/users/:userId/modify" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<UserModifier/>} />
				</Route>
				<Route path="/products/:productId/modify" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<ProductModifier/>} />
				</Route>


			</Routes>
			<footer>
				<p>Copyright &copy; 2022</p>
			</footer>
		</div>
	);
};

export default App;
