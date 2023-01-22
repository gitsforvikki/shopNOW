import Axios from 'axios';
import * as alertActions from '../../redux/alert/alert.action';


import * as authUtil from '../../util/authUtil';
import * as userUtil from '../../util/userUtil';

//ADD TO CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

//incement qty
export const INCR_QTY = 'INCR_QTY';
export const INCR_QTY_FAILURE = 'INCR_QTY_FAILURE';

//delete cart itam
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const DELETE_CART_ITEM_FAILURE = 'DELETE_CART_ITEM_FAILURE';


//decrement qty
export const DECR_QTY = 'DECR_QTY';
export const DECR_QTY_FAILURE = 'DECR_QTY_FAILURE';

//clear cart items
export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS';
export const CLEAR_CART_ITEMS_FAILURE = 'CLEAR_CART_ITEMS_FAILURE';
//order place
export const ORDER_PLACE_REQUEST = 'ORDER_PLACE_REQUEST';
export const ORDER_PLACE_SUCCESS = 'ORDER_PLACE_SUCCESS';
export const ORDER_PLACE_FAILURE = 'ORDER_PLACE_FAILURE';


export const GET_ALL_ORDER_REQUEST = 'GET_ALL_ORDER_REQUEST';
export const GET_ALL_ORDER_SUCCESS = 'GET_ALL_ORDER_SUCCESS';
export const GET_ALL_ORDER_FAILURE = 'GET_ALL_ORDER_FAILURE';

export const STRIP_PAYMENT_REQUEST = 'STRIP_PAYMENT_REQUEST';
export const STRIP_PAYMENT_SUCCESS = 'STRIP_PAYMENT_SUCCESS';
export const STRIP_PAYMENT_FAILURE = 'STRIP_PAYMENT_FAILURE';

//ADD TO CART

export const addToCart=(item , navigate)=>{
  return (dispatch)=>{
    try{
      dispatch({type:ADD_TO_CART , payload:{item : item}});
      navigate('/orders/cart');
    }
    catch(error){
      console.log(error);
      dispatch({type : ADD_TO_CART_FAILURE , payload:{error:error}});
    }

  }
};

//increment cart item qty
export const incrCartItemQty =(productId)=>{
  return (dispatch)=>{
    try{
        dispatch({type : INCR_QTY , payload:{productId : productId}});
    }
    catch(error){
        dispatch({type : INCR_QTY_FAILURE , payload:{error : error}});
    }
  }
};



//decrement cart item qty
export const decrCartItemQty =(productId)=>{
  return (dispatch)=>{
    try{
        dispatch({type : DECR_QTY , payload:{productId : productId}});
    }
    catch(error){
        dispatch({type : DECR_QTY_FAILURE , payload:{error : error}});
    }
  }
};

//delete cart item
export const deleteCartItem =(productId)=>{
  return (dispatch)=>{
    try{
      dispatch({type : DELETE_CART_ITEM , payload:{productId : productId}});
    }
    catch(error){
      console.log(error);
      dispatch({type : DELETE_CART_ITEM_FAILURE , payload:{error : error}});
    }
  }
}

//clear cart items
export const clearCartItem = ()=>{
  return (dispatch)=>{
      try {
          dispatch({type : CLEAR_CART_ITEMS});
      }
      catch (error) {
          dispatch({type :CLEAR_CART_ITEMS_FAILURE , payloadv:{error : error}});
      }
  }
};


//ORDER PLACE
export const orderPlace=(order , navigate)=>{
    return async (dispatch)=>{
      try{
        if(userUtil.isAuthenticated()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : ORDER_PLACE_REQUEST});
          let dataUrl = `/api/orders`;
          let response = await Axios.post(dataUrl , order);
          dispatch({type  : ORDER_PLACE_SUCCESS , payload : response.data});
          dispatch(alertActions.setAlert(response.data.msg , 'success'));
          navigate('/orders/order-success');
        }
       
      }
      catch(error){
        console.log(error);
        dispatch({type : ORDER_PLACE_FAILURE , payload:{error :error}});
      }
    }
};


//STRIP payments
export const makeStripePayment = (body , navigate  , order) => {
  return async (dispatch) => {
      try {
          // setting the token to request header to send to server
          if(userUtil.isAuthenticated()){
              authUtil.setAuthToken(userUtil.getToken());
          }
          dispatch({type : STRIP_PAYMENT_REQUEST});
          let dataURL = `/api/payments/pay`;
          let response = await Axios.post(dataURL , body);
          dispatch({type : STRIP_PAYMENT_SUCCESS , payload : response.data});
          dispatch(alertActions.setAlert('Payment Success', 'success'));
          // dispatch an action to place an order
          dispatch(orderPlace(order , navigate));
      }
      catch (error) {
          dispatch({type : STRIP_PAYMENT_FAILURE , payload : error });
      }
  }
};




//get all orders
export const getAllOrders=()=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isAuthenticated()){
        authUtil.setAuthToken(userUtil.getToken());
        dispatch({type : GET_ALL_ORDER_REQUEST});
        let dataUrl = `/api/orders/all`;
        let response = await Axios.get(dataUrl);
        dispatch({type  : GET_ALL_ORDER_SUCCESS , payload : response.data});
      }
     
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_ALL_ORDER_FAILURE , payload:{error :error}});
    }
  }
}