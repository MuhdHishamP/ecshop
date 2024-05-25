import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productListReducers,
  productDetailsReducers,
  productReviewCreateReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateProfileReducer,
  userListReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  cart: cartReducers,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddresssFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

export const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddresssFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export default store;
