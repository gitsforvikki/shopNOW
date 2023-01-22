import React from 'react';
import {useSelector , useDispatch} from 'react-redux';
import * as orderReducer from '../..//redux/order/order.reducer';
import * as orderActions from '../../redux/order/order.action';
import Spinner from "../../util/spinner/Spinner";
import {Link} from 'react-router-dom';



let  Cart = ()=>{

    let dispatch = useDispatch();

    let productInfo = useSelector((state)=>{
        return state[orderReducer.orderFeaturesKey];
    });
    let {loading , cartItems} = productInfo;


    let decrQty=(productId)=>{
       dispatch(orderActions.decrCartItemQty(productId))
    };
    let incrQty = (productId)=>{
        dispatch(orderActions.incrCartItemQty(productId))
    };

    let clickDeleteCartItem = (productId)=>{
        dispatch(orderActions.deleteCartItem(productId));
    };
    let calcTotal = ()=>{
        let total = 0;
        for(let cartItem of cartItems){
            total += cartItem.price * cartItem.qty;
        }
        return total;
    };
    let calttax = ()=>{
        return calcTotal()* Number(process.env.REACT_APP_TAX) /100 ;

    };
    let grandTotal = ()=>{
        return calcTotal() + calttax();
    };

  return(
      <React.Fragment>
          <section className="bg-brown text-dark p-3">
              <div className="container">
                  <div className="row">
                      <div className="col">
                          <h3><i className="fa fa-shopping-cart"/>Your Cart</h3>
                      </div>
                  </div>
              </div>
          </section>
          {
              loading ? <Spinner/> :

                  <React.Fragment>
                      <section>
                          <div className="container mt-3">
                              <div className="row">
                                  <div className="col-md-8">
                                      <div className="card">
                                          <div className="card-header bg-dark">
                                              <p className="h3 text-brown">Your Cart Item</p>
                                          </div>
                                          <div className="card-body">
                                              <table className="table table-hover table-striped text-center ">
                                                  <thead className="bg-brown">
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price (&#8377; )</th>
                                                        <th>Action</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                  {
                                                      cartItems.length > 0 ?
                                                          <React.Fragment>
                                                              {
                                                                  cartItems.map(item =>{
                                                                      return(
                                                                          <React.Fragment>
                                                                              <tr key={item._id}>
                                                                                  <td>
                                                                                      <img src={item.image} alt="" width="40" height="60"/>
                                                                                  </td>
                                                                                  <td>{item.name}</td>
                                                                                  <td>
                                                                                      <i onClick={decrQty.bind(this , item._id)} className="fa fa-minus-circle mx-1"/>
                                                                                      {item.qty}
                                                                                      <i onClick={incrQty.bind(this , item._id)} className="fa fa-plus-circle mx-1"/>
                                                                                  </td>
                                                                                  <td> <span>Rs{' '}</span> {item.price.toFixed(2)}</td>
                                                                                  <td>
                                                                                      <button onClick={clickDeleteCartItem.bind(this , item._id)} className="btn btn-danger btn-sm">Remove</button>
                                                                                  </td>
                                                                              </tr>
                                                                          </React.Fragment>
                                                                      )
                                                                  })
                                                              }
                                                          </React.Fragment>

                                                          :

                                                          <React.Fragment>
                                                             <section className='text-center'>
                                                                <p className='h3 m-2'>Cart is empty...</p>
                                                                <Link to="/" className="btn btn-dark text-brown btn-sm m-3">Shop Now</Link>
                                                             </section>
                                                             
                                                          </React.Fragment>
                                                  }
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <div className="card-header bg-dark">
                                          <p className="h3 text-brown">Your Total</p>
                                      </div>
                                      <div className="card-body ">
                                          <ul className="list-group">
                                              <li className="list-group-item bg-brown">
                                                  Total : <span>Rs{' '}</span>{calcTotal().toFixed(2)}
                                              </li>
                                              <li className="list-group-item bg-brown">
                                                  Tax : <span>Rs{' '}</span>{calttax().toFixed(2)}
                                              </li>
                                              <li className="list-group-item bg-brown">
                                                  Grand Total :<span>Rs{' '}</span>{grandTotal().toFixed(2)}
                                              </li>
                                          </ul>
                                          <div className="mt-2">
                                              <Link to="/orders/checkout" className="btn btn-secondary btn-sm">CheckOut</Link>
                                              <Link to="/" className="btn btn-primary btn-sm">Shop More</Link>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </section>
                  </React.Fragment>
          }
      </React.Fragment>
  )
};
export  default Cart;