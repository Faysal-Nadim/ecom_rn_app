import axiosInstance from "../helpers/axios";
import { orderConstant } from "./constants";
import Toast from "react-native-toast-message";

export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstant.ORDER_REQUEST });
      const res = await axiosInstance.get(`/user/order/get`);
      if (res.status === 200) {
        dispatch({
          type: orderConstant.ORDER_SUCCESS,
          payload: res.data.orders,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: orderConstant.ORDER_FAILURE,
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
