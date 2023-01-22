import * as productActions from './product.action';

export const productFeaturesKey = "productInfo";

let initialState={
  loading :false,
  products:[],
  selectedProducts:{},
  errorMessage:''
}

export const reducer=(state = initialState , actions)=>{
  let {type , payload} = actions;
  switch (type) {

    //mens products
    case productActions.GET_MENS_PRODUCTS_REQUEST :
      return{
        ...state,
        loading:true
      };
    case productActions.GET_MENS_PRODUCTS_SUCCESS :
        return{
          ...state,
          loading:false,
          products:payload.products
        };
    case productActions.GET_MENS_PRODUCTS_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };
      
      //get womens products
      case productActions.GET_WOMENS_PRODUCTS_REQUEST :
      return{
        ...state,
        loading:true
      };
    case productActions.GET_WOMENS_PRODUCTS_SUCCESS :
        return{
          ...state,
          loading:false,
          products:payload.products
        };
    case productActions.GET_WOMENS_PRODUCTS_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };
      
      //get kids products
      case productActions.GET_KIDS_PRODUCTS_REQUEST :
      return{
        ...state,
        loading:true
      };
    case productActions.GET_KIDS_PRODUCTS_SUCCESS :
        return{
          ...state,
          loading:false,
          products:payload.products
        };
    case productActions.GET_KIDS_PRODUCTS_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };

      //upload products
      case productActions.UPLOAD_PRODUCTS_REQUEST :
      return{
        ...state,
        loading:true
      };
    case productActions.UPLOAD_PRODUCTS_SUCCESS :
        return{
          ...state,
          loading:false,
          products:payload.products
        };
    case productActions.UPLOAD_PRODUCTS_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };

      //get single products
      case productActions.GET_SINGLE_PRODUCTS_REQUEST :
      return{
        ...state,
        loading:true
      };
    case productActions.GET_SINGLE_PRODUCTS_SUCCESS :
        return{
          ...state,
          loading:false,
          selectedProducts:payload.product
        };
    case productActions.GET_SINGLE_PRODUCTS_FAILURE :
      return{
        ...state,
        loading:false,
        errorMessage:payload.error
      };
      

  
    default: return state;
     
  }
};