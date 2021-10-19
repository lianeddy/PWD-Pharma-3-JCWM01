import { combineReducers } from "redux";
import { authReducer } from "./loginReducers";
import { userReducer } from "./userReducers";
import { cartReducer } from "./cartReducer";

export const Reducers = combineReducers({
  authReducer,
  userReducer,
  cartReducer,
});
