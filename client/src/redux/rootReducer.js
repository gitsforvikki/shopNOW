import { combineReducers } from "redux";
import * as userReducer from './user/user.reducer';
import * as productReducer from './products/product.reducer';
import * as alertReducer from './alert/alert.reducer';
import * as orderReducer from './order/order.reducer';

export const rootReducer  = combineReducers({
  [userReducer.userFeaturesKey] : userReducer.reducer,
  [productReducer.productFeaturesKey]:productReducer.reducer,
  [alertReducer.alertFeatureskey]  :alertReducer.reducer,
  [orderReducer.orderFeaturesKey] : orderReducer.reducer
});
