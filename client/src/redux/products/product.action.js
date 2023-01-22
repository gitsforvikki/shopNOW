import Axios from 'axios';
import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authUtil';
import * as alertActions from '../../redux/alert/alert.action';

export const GET_MENS_PRODUCTS_REQUEST = 'GET_MENS_PRODUCTS_REQUEST';
export const GET_MENS_PRODUCTS_SUCCESS = 'GET_MENS_PRODUCTS_SUCCESS';
export const GET_MENS_PRODUCTS_FAILURE = 'GET_MENS_PRODUCTS_FAILURE';

export const GET_WOMENS_PRODUCTS_REQUEST = 'GET_WOMENS_PRODUCTS_REQUEST';
export const GET_WOMENS_PRODUCTS_SUCCESS = 'GET_WOMENS_PRODUCTS_SUCCESS';
export const GET_WOMENS_PRODUCTS_FAILURE = 'GET_WOMENS_PRODUCTS_FAILURE';


export const GET_KIDS_PRODUCTS_REQUEST = 'GET_KIDS_PRODUCTS_REQUEST';
export const GET_KIDS_PRODUCTS_SUCCESS = 'GET_KIDS_PRODUCTS_SUCCESS';
export const GET_KIDS_PRODUCTS_FAILURE = 'GET_KIDS_PRODUCTS_FAILURE';


export const UPLOAD_PRODUCTS_REQUEST = 'UPLOAD_PRODUCTS_REQUEST';
export const UPLOAD_PRODUCTS_SUCCESS = 'UPLOAD_PRODUCTS_SUCCESS';
export const UPLOAD_PRODUCTS_FAILURE = 'UPLOAD_PRODUCTS_FAILURE';


export const GET_SINGLE_PRODUCTS_REQUEST = 'GET_SINGLE_PRODUCTS_REQUEST';
export const GET_SINGLE_PRODUCTS_SUCCESS = 'GET_SINGLE_PRODUCTS_SUCCESS';
export const GET_SINGLE_PRODUCTS_FAILURE = 'GET_SINGLE_PRODUCTS_FAILURE';


//get mems products

export const getMensProducts=()=>{
  return async (dispatch)=>{
    try{
        dispatch({type : GET_MENS_PRODUCTS_REQUEST});
        let dataUrl  = `/api/products/men`;
        let response =  await Axios.get(dataUrl);
        dispatch({type : GET_MENS_PRODUCTS_SUCCESS ,payload : response.data});
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_MENS_PRODUCTS_FAILURE , payload :{error:error}});
    }
  }
};





//get womens products

export const getWomensProducts=()=>{
  return async (dispatch)=>{
    try{
        dispatch({type : GET_WOMENS_PRODUCTS_REQUEST});
        let dataUrl  = `/api/products/women`;
        let response =  await Axios.get(dataUrl);
        dispatch({type : GET_WOMENS_PRODUCTS_SUCCESS  ,payload : response.data});
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_WOMENS_PRODUCTS_FAILURE , payload :{error:error}});
    }
  }
};




//get kids products

export const getKidsProducts=()=>{
  return async (dispatch)=>{
    try{
        dispatch({type : GET_KIDS_PRODUCTS_REQUEST});
        let dataUrl  = `/api/products/kids`;
        let response =  await Axios.get(dataUrl);
        dispatch({type : GET_KIDS_PRODUCTS_SUCCESS  ,payload : response.data});
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_KIDS_PRODUCTS_FAILURE , payload :{error:error}});
    }
  }
};





//upload products

export const uploadProducts=(product )=>{
  return async (dispatch)=>{
    try{
        if(userUtil.isAuthenticated()){
          authUtil.setAuthToken(userUtil.getToken());
          dispatch({type : UPLOAD_PRODUCTS_REQUEST});
          let dataUrl  = `/api/products/upload`;
          let response =  await Axios.post(dataUrl , product);
          dispatch({type : UPLOAD_PRODUCTS_SUCCESS  ,payload : response.data});
         
          dispatch(alertActions.setAlert(response.data.msg , 'success'));
        }
    }
    catch(error){
      console.log(error);
      dispatch({type : UPLOAD_PRODUCTS_FAILURE , payload :{error:error}});
    }
  }
};



//get SINGLE products

export const getSingleProducts=(productId)=>{
  return async (dispatch)=>{
    try{
        dispatch({type : GET_SINGLE_PRODUCTS_REQUEST});
        let dataUrl  = `/api/products/${productId}`;
        let response =  await Axios.get(dataUrl);
        dispatch({type : GET_SINGLE_PRODUCTS_SUCCESS  ,payload : response.data});
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_SINGLE_PRODUCTS_FAILURE , payload :{error:error}});
    }
  }
};

