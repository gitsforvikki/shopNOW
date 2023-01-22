import Axios from 'axios';
import * as alertActions from '../alert/alert.action';
import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authUtil';


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';


export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';


export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';



//LOGOUT USER
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";


//user reister
export const registerUser =(user)=>{
  return async(dispatch)=>{
    try{
        dispatch({type : REGISTER_USER_REQUEST});
        let dataUrl  = `/api/users/register`;
        let response = await Axios.post(dataUrl ,  user);
        dispatch({type : REGISTER_USER_SUCCESS , payload :  response.data});
        dispatch(alertActions.setAlert(response.data.msg , 'success'));
    }
    catch(error){
      console.log(error);
      dispatch({type : REGISTER_USER_FAILURE , payload : {error : error}});
      let errorList = error.response.data.errors;
      for(let error of errorList){
        dispatch(alertActions.setAlert(error.msg , 'danger'));
      }
    }
  }
};


//user login
export const loginUser =(user , navigate)=>{
  return async(dispatch)=>{
    try{
        dispatch({type : LOGIN_USER_REQUEST });
        let dataUrl  = `/api/users/login`;
        let response = await Axios.post(dataUrl ,  user);
        dispatch({type : LOGIN_USER_SUCCESS , payload :  response.data});
        dispatch(alertActions.setAlert(response.data.msg , 'success'));
        dispatch(getUser());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        navigate('/');
    }
    catch(error){
      console.log(error);
      dispatch({type : LOGIN_USER_FAILURE , payload : {error : error}});
      let errorList = error.response.data.errors;
      for(let error of errorList){
        dispatch(alertActions.setAlert(error.msg , 'danger'));

      }
    }
  }
};


//getUser
export const getUser =()=>{
  return async (dispatch)=>{
    try{
      if(userUtil.isAuthenticated()){
        authUtil.setAuthToken(userUtil.getToken())
        dispatch({type : GET_USER_REQUEST});
        let dataUrl =`/api/users/`;
        let response = await Axios.get(dataUrl);
        dispatch({type : GET_USER_SUCCESS , payload : response.data});
      }
    }
    catch(error){
      console.log(error);
      dispatch({type : GET_USER_FAILURE , payload:{error : error}});
    }
  }
};

//update address
export const updateAddress = (address) =>{
  return async (dispatch)=>{
    try{
      if(userUtil.isAuthenticated()){
        authUtil.setAuthToken(userUtil.getToken());
        dispatch({type : UPDATE_ADDRESS_REQUEST});
        let dataUrl =`/api/users/address`;
        let response =  await Axios.post(dataUrl , address);
        dispatch({type : UPDATE_ADDRESS_SUCCESS , payload:response.data});

      }
    }
    catch(error){
      console.log(error);
      dispatch({type : UPDATE_ADDRESS_FAILURE , payload:{error:error}});
    }
  }
};

//logout user
export const logoutUser =()=>{
  return async (dispatch)=>{
    try{
          dispatch({type : LOGOUT_USER});
    }
    catch(error){
      console.log(error);
      dispatch({type : LOGOUT_USER_FAILURE , payload : {error : error}});
    }
  }
}

