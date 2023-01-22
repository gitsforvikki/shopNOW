import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as userReducer from '../../redux/user/user.reducer';
import * as userActions from '../../redux/user/user.action';
import * as orderReducer from '../../redux/order/order.reducer';
import logo from '../../assets/img/shopping-now.png';
import * as userUtil from '../../util/userUtil';

let Navbar = ()=>{

  let dispatch=useDispatch();

  let userInfo = useSelector((state)=>{
    return state[userReducer.userFeaturesKey];
  });
  let {user , isAuthenticated} = userInfo;

  
  let orderInfo = useSelector((state) => {
    return state[orderReducer.orderFeaturesKey];
  });

  let {cartItems} = orderInfo;
  let clickLogout=()=>{
    dispatch(userActions.logoutUser());
  }
  let beforeLogin =(
    <React.Fragment>
    <li className="nav-item">
        <Link  to="/users/register" className="nav-link"  >
          <i className="fa fa-user-shield" /> Register
        </Link>
    </li>
    <li className="nav-item">
      <Link  to="/users/login" className="nav-link"  >
       <i className="fa fa-sign-in-alt " /> Login
      </Link>
    </li>
</React.Fragment>
  );


let afterLogin = (
  <React.Fragment>
                {
                  Object.keys(user).length > 0 &&
                  <React.Fragment>
                    <li className="nav-item">
                      <Link  to="/users/profile" className="nav-link"  >
                        <img src ={user.avatar}  alt="" width="30" height="30" className="rounded-circle"/>
                        {' '}{user.name}
                      </Link>
                    </li>
                  </React.Fragment>
                }
                <li className="nav-item">
                  <Link  to="/" onClick={clickLogout} className="nav-link"  >
                   <i className="fa fa-sign-out-alt " /> Logout
                  </Link>
                </li>
  </React.Fragment>
);
  return(
    <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" >
          <div className="container">
            <Link to='/' className="navbar-brand">
              <img src={logo} alt=""  width="120" height="50"/>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/products/mens" className="nav-link" >Men's wear</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products/kids" className="nav-link" >Kid's wear</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products/womens" className="nav-link" >Women's wear</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products/upload" className="nav-link" >Upload</Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders/cart" className="nav-link" >
                  <i className="fa fa-shopping-cart"/>
                                    <span className="badge badge-danger">{cartItems.length}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders/list" className="nav-link" >List</Link>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
               {
                    userUtil.getToken() ? afterLogin  : beforeLogin
               }
              </ul>
            </div>
          </div>
        </nav>
    </React.Fragment>
  )
}
export default Navbar;