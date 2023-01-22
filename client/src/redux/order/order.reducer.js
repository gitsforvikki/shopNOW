import * as orderActions from './order.action';

export const orderFeaturesKey = 'orderInfo';

let initialState={
  loading:false,
  allOrders:[],
  orderPlcaced:{},
  cartItems:[],
  errorMessage :'',
};


export const reducer =(state=initialState , actions )=>{
    let {type , payload} = actions;
    switch (type) {

      //add to cart
        case orderActions.ADD_TO_CART :
          let isExist = state.cartItems.find(item => item._id === payload.item._id);
          if(isExist) return state;
          
          return{
            ...state,
            cartItems :  [...state.cartItems , payload.item]
          }
        case orderActions.ADD_TO_CART_FAILURE :
        return {
          ...state,
          errorMessage : payload.error
        };

        //increment qty
        case orderActions.INCR_QTY :
          let updatedCartItems = state.cartItems.map(item =>{
            if(item._id === payload.productId){
              return{
                ...item,
                qty : item.qty+1
              }
            }
            return item;
          });
          return{
            ...state,
            cartItems :  [...updatedCartItems]
          };
        case orderActions.INCR_QTY_FAILURE :
        return {
          ...state,
          errorMessage : payload.error
        };


        //decrement cart item qty
        case orderActions.DECR_QTY:
            let updateCartItems  = state.cartItems.map(item =>{
              if(item._id === payload.productId){
                return{
                  ...item,
                  qty : item.qty > 1 ? item.qty-1 : item.qty
                }
              }
              else{
                return item
              }
            });
          return{
            ...state,
            cartItems : [...updateCartItems]
          };
        
        case orderActions.DECR_QTY_FAILURE:
          return{
            ...state,
            errorMessage:payload.error
          };

          //delete cart item
        case orderActions.DELETE_CART_ITEM :
          let updatedCartItem = state.cartItems.filter(item => item._id !== payload.productId);
          return{
            ...state,
            cartItems:[...updatedCartItem]
          };
        case orderActions.DELETE_CART_ITEM_FAILURE :
          return{
            ...state,
            errorMessage:payload.error
          };

          //clear cart items
          case orderActions.CLEAR_CART_ITEMS :
            return{
              ...state,
              cartItems:[]
            };
          case orderActions.CLEAR_CART_ITEMS_FAILURE :
            return{
              ...state,
              errorMessage:payload.error
            };
      //order place
      case orderActions.ORDER_PLACE_REQUEST :
        return {
          ...state,
          loading : true
        };
        case orderActions.ORDER_PLACE_SUCCESS :
        return {
          ...state,
          loading:false,
          orderPlcaced :  payload.order,
          cartItems:[]
        };
        case orderActions.ORDER_PLACE_FAILURE :
        return {
          ...state,
          loading :false,
          errorMessage : payload.error
        };

        // Make Stripe Payments
        case orderActions.STRIP_PAYMENT_REQUEST :
            return  {
                ...state,
                loading: true
            };
        case orderActions.STRIP_PAYMENT_SUCCESS :
            return  {
                ...state,
                loading: false
            };
        case orderActions.STRIP_PAYMENT_FAILURE :
            return  {
                ...state,
                loading: false,
                errorMessage: payload
            };
        //get all orders 
      case orderActions.GET_ALL_ORDER_REQUEST :
        return {
          ...state,
          loading : true
        };
        case orderActions.GET_ALL_ORDER_SUCCESS :
        return {
          ...state,
          loading:false,
          allOrders : payload.orders
        };
        case orderActions.GET_ALL_ORDER_FAILURE :
        return {
          ...state,
          loading :false,
          errorMessage : payload.error
        };
      default :  return state;
    }
}