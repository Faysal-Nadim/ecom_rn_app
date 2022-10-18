import { courierConstant } from "../actions/constants";

const initState = {
  pathao: null,
  error: null,
  loading: false,
  city: null,
  zone: null,
  area: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case courierConstant.PATHAO_FEE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courierConstant.PATHAO_FEE_SUCCESS:
      state = {
        ...state,
        pathao: action.payload,
        loading: false,
      };
      break;
    case courierConstant.PATHAO_FEE_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case courierConstant.CITY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courierConstant.CITY_SUCCESS:
      state = {
        ...state,
        city: action.payload,
        loading: false,
      };
      break;
    case courierConstant.CITY_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case courierConstant.ZONE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courierConstant.ZONE_SUCCESS:
      state = {
        ...state,
        zone: action.payload,
        loading: false,
      };
      break;
    case courierConstant.ZONE_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case courierConstant.AREA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case courierConstant.AREA_SUCCESS:
      state = {
        ...state,
        area: action.payload,
        loading: false,
      };
      break;
    case courierConstant.AREA_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
  }
  return state;
};
