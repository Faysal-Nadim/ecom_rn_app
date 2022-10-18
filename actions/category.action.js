import axiosInstance from "../helpers/axios";
import { categoryConstant } from "./constants";
import Toast from "react-native-toast-message";

export const getCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstant.CATEGORY_REQUEST });
      const res = await axiosInstance.get(`/category/get/all`);
      if (res.status === 200) {
        dispatch({
          type: categoryConstant.CATEGORY_SUCCESS,
          payload: res.data.categories,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: categoryConstant.CATEGORY_FAILURE,
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
