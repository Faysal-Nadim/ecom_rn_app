import axiosInstance from "../helpers/axios";
import { addressConstant } from "./constants";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: addressConstant.ADDRESS_REQUEST });
      const res = await axiosInstance.get(`/user/address/get`);
      if (res.status === 200) {
        dispatch({
          type: addressConstant.ADDRESS_SUCCESS,
          payload: res.data.addresses,
        });
      }
    } catch (error) {
      dispatch({
        type: addressConstant.ADDRESS_FAILURE,
        payload: error.response,
      });
    }
  };
};
