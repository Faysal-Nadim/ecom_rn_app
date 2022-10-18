import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import verifyReducer from "./verify.reducer";
import categoryReducer from "./category.reducer";
import addressReducer from "./address.reducer";
import courierReducer from "./courier.reducer";
import orderReducer from "./order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  verify: verifyReducer,
  cart: cartReducer,
  category: categoryReducer,
  address: addressReducer,
  courier: courierReducer,
  order: orderReducer,
});

export default (state, action) =>
  rootReducer(action.type === "LOGOUT_SUCCESS" ? undefined : state, action);
