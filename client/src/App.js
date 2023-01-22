import React, { useEffect } from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './layout/home/Home';
import Navbar from './layout/navbar/Navbar';
import MensWear from './modules/products/MensWear'
import WomensWear from './modules/products/WomensWear';
import KidsWear from './modules/products/KidsWear';
import UserLogin from './modules/user/UserLogin';
import UserRegister from './modules/user/UserRegister';
import UploadProducts from './modules/products/UploadProducts';
import Alert from './util/alert/Alert';
import Cart from './modules/order/Cart';
import OrderList from './modules/order/OrderList';
import OrderSuccess from './modules/order/OrderSuccess';
import CheckOut from './modules/order/CheckOut';
import * as userActions from './redux/user/user.action';
import { useDispatch } from 'react-redux';
import ProductDetails from './modules/products/ProductDetails';
import UserProfile from './modules/user/UserProfile';
import PrivateRoute from './util/PrivateRoute';


let App =()=> {

  let dispatch =useDispatch();
  
  useEffect(()=>{
    dispatch(userActions.getUser());
  },[]); 
  return (
   <React.Fragment>
   <Router>
    <Navbar/>
    <Alert/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products/mens' element={<MensWear/> } />
      <Route path='/products/womens' element={<WomensWear/>} />
      <Route path='/products/kids' element={<KidsWear/>} />
      <Route path='/products/upload' element={<PrivateRoute><UploadProducts/></PrivateRoute>} />
      <Route path='/products/:productId' element={<PrivateRoute><ProductDetails/></PrivateRoute>} />
      <Route path='/orders/cart' element={<Cart/>} />
      <Route path='/orders/list' element={<PrivateRoute><OrderList/></PrivateRoute>} />
      <Route path='/orders/order-success' element={<PrivateRoute><OrderSuccess/></PrivateRoute>} />
      <Route path='/orders/checkout' element={<PrivateRoute><CheckOut/></PrivateRoute>} />
      <Route path='/users/login' element={<UserLogin/>} />
      <Route path='/users/register' element={<UserRegister/>} />
      <Route path='/users/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />
      
    </Routes>
   </Router>
   
   </React.Fragment>
  )
};

export default App;
