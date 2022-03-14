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
			<Routes>

				<Route element={<Notification/>}/>

				<Route path='/' element={<Home/>} />
				<Route path='/*' element={<NotFound/>} />
				<Route path='/products' element={<Products/>} />
				<Route path='/products/:productId' element={<Product/>} />
				<Route element={<Finder type={'product'} getProduct={getProduct}/>}/>
				{/* <Route path='/register' element={<Register/>} /> */}


				

				
				
				
				<Route path="/cart" element={<Auth authRoles={['guest']}/>}>
          			<Route element={<Cart />} />
       		    </Route>

				

				   {/* guest */}
				<Route path="/register" element={<Auth authRoles={['guest']} />}>
					<Route path='' element={<Register/>} />
       		    </Route>
				<Route path="/login" element={<Auth authRoles={['guest']} />}>
					<Route path='' element={<Login/>} />
       		    </Route>
				<Route path="/orders" element={<Auth authRoles={['customer', 'admin']} />}>
					<Route path='' element={<Orders/>} />
       		    </Route>



				<Route path="/cart" element={<Auth authRoles={['guest', 'customer']} />}>
					<Route path='' element={<Cart/>} />
       		    </Route>

				   {/* cutomer */}
				<Route path="/orders" element={<Auth authRoles={['customer', 'admin']} />}>
					<Route path='' element={<Orders/>} />
       		    </Route>
				<Route path="/orders/:orderId" element={<Auth authRoles={['customer', 'admin']} />}>
					<Route path='' element={<Order/>} />
       		    </Route>

				   {/* admin */}
				<Route path="/users" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<Users/>} />
       		    </Route>
				<Route path="/users/:userId" element={<Auth authRoles={['admin']} />}>
					<Route path='' element={<User/>} />
       		    </Route>
				

				
				
			
				
				{/* <Route element={<Auth authRoles={['admin']}/>}>

					<Route path='/users' element={<Users/>} />
					<Route path='/users/:userId' element={<User/>} />
					<Route path='/users/:userId/modify' element={<UserModifier/>} />
					<Route element={<Finder type={'user'} getUser={getUser}/>}/>
					<Route path='/products/:productId/modify' element={<ProductModifier/>} />
					
					
				</Route>

				<Route element={<Auth authRoles={['customer', 'admin']}/>}>
					
					
					<Route element={<Finder type={'order'} getUser={getOrder}/>}/>

					<Route path='/orders' element={<Orders/>} />
					<Route path='/orders/:orderId' element={<Order/>} />

					<Route path='/cart' element={<Cart/>} />
					<Route element={<Finder type={'product'} getUser={getProduct}/>}/>
					<Route element={<Finder type={'order'} getUser={getOrder}/>}/>
				</Route>

				 */}

				




			</Routes>
			<footer>
				<p>Copyright &copy; 2022</p>
			</footer>
		</div>
	);
};

export default App;
