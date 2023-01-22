import *  as userActions from './user.action';


export const userFeaturesKey =  "userInfo";

let initialState = {
  loading:false,
  user:{},
  token:'',
  isAuthenticated:false,
  errorMessage:''
};

export const reducer = (state = initialState , actions)=>{

  let {type ,  payload} = actions;

  switch (type) {
    //register user
    case userActions.REGISTER_USER_REQUEST:
      return{
        ...state,
        loading:true
      };
    case userActions.REGISTER_USER_SUCCESS:
      return{
        ...state,
        loading:false
      };
    case userActions.REGISTER_USER_FAILURE:
      localStorage.removeItem('shoping-token');
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };

      //login user
      case userActions.LOGIN_USER_REQUEST:
      return{
        ...state,
        loading:true
      };
    case userActions.LOGIN_USER_SUCCESS:
      localStorage.setItem('shoping-token' , payload.token);
      return{
        ...state,
        loading:false,
        token : payload.token,
        isAuthenticated:true
      };
    case userActions.LOGIN_USER_FAILURE:
      localStorage.removeItem('shoping-token');
      return{
        ...state,
        loading:false,
        token :'',
        isAuthenticated:false,
        errorMessage:payload.error
      };

      //get user
      case userActions.GET_USER_REQUEST:
      return{
        ...state,
        loading:true
      };
    case userActions.GET_USER_SUCCESS:
      return{
        ...state,
        loading:false,
        user:payload.user
      };
    case userActions.GET_USER_FAILURE:
      return{
        ...state,
        loading:false,
        user:{},
        errorMessage:payload.error
      };

      //update address
      case userActions.UPDATE_ADDRESS_REQUEST:
      return{
        ...state,
        loading:true
      };
    case userActions.UPDATE_ADDRESS_SUCCESS:
      return{
        ...state,
        loading:false,
        user:payload.user
      };
    case userActions.UPDATE_ADDRESS_FAILURE:
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };
      //logout usr
      case userActions.LOGOUT_USER:
        localStorage.removeItem('shoping-token');
      return{
        ...state,
        loading:false,
        token : '',
        isAuthenticated:false
      };
    case userActions.UPDATE_ADDRESS_FAILURE:
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };

      
    default : return state;
  }

};