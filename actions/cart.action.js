import axiosInstance from "../helpers/axios";
import { cartConstant } from "./constants";
import Toast from "react-native-toast-message";

export const getCart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstant.CART_REQUEST });
      const res = await axiosInstance.get(`/user/cart`);
      if (res.status === 200) {
        dispatch({
          type: cartConstant.CART_SUCCESS,
          payload: res.data.cart,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: cartConstant.CART_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
    }
  };
};

export const addToCart = (item, qty) => {
  return async (dispatch) => {
    const data = {
      cartItems: {
        product: item.product._id,
        qty: qty,
        props: {
          name: item.props.name,
          value: item.props.value,
          sku: item.props.sku,
        },
      },
    };
    try {
      dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.post(`/user/cart/create`, data);
      if (res.status === 201) {
        dispatch({
          type: cartConstant.ADD_TO_CART_SUCCESS,
          payload: res.data.cart,
        });
        dispatch(getCart());
        Toast.show({
          type: "success",
          text1: `${res.data.msg}`,
          visibilityTime: 1000,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: cartConstant.ADD_TO_CART_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      Toast.show({
        type: "error",
        text1: `${data.msg}`,
        text2: `Status ${error.response.status}`,
      });
    }
  };
};

export const removeCartItem = (item) => {
  return async (dispatch) => {
    const data = {
      _id: item._id,
    };
    try {
      dispatch({ type: cartConstant.REMOVE_CART_REQUEST });
      const res = await axiosInstance.post(`/user/cart/remove`, data);
      if (res.status === 201) {
        dispatch({
          type: cartConstant.REMOVE_CART_SUCCESS,
          payload: res.data.result,
        });
        dispatch(getCart());
        Toast.show({
          type: "info",
          text1: `${res.data.msg}`,
          visibilityTime: 1000,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: cartConstant.REMOVE_CART_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      Toast.show({
        type: "error",
        text1: `${data.msg}`,
        text2: `Status ${error.response.status}`,
      });
    }
  };
};
