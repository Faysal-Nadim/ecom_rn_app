import axiosInstance from "../helpers/axios";
import { courierConstant } from "./constants";
import Toast from "react-native-toast-message";

export const pathaoFee = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: courierConstant.PATHAO_FEE_REQUEST });
      const res = await axiosInstance.post(`/courier/pathao/fee`, data);
      if (res.status === 200) {
        dispatch({
          type: courierConstant.PATHAO_FEE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: courierConstant.PATHAO_FEE_FAILURE,
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

export const getCity = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: courierConstant.CITY_REQUEST });
      const res = await axiosInstance.get(`/courier/pathao/get-city`);
      if (res.status === 200) {
        dispatch({
          type: courierConstant.CITY_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: courierConstant.CITY_FAILURE,
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

export const getZone = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: courierConstant.ZONE_REQUEST });
      const res = await axiosInstance.post(`/courier/pathao/get-zone`, data);
      if (res.status === 200) {
        dispatch({
          type: courierConstant.ZONE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: courierConstant.ZONE_FAILURE,
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

export const getArea = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: courierConstant.AREA_REQUEST });
      const res = await axiosInstance.post(`/courier/pathao/get-area`, data);
      if (res.status === 200) {
        dispatch({
          type: courierConstant.AREA_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: courierConstant.AREA_FAILURE,
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
