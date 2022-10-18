import { cartConstant } from "../actions/constants";

const initState = {
  cart: {},
  error: null,
  addToCart: false,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case cartConstant.CART_REQUEST:
      state = {
        ...state,
        loading: false,
      };
      break;
    case cartConstant.CART_SUCCESS:
      state = {
        ...state,
        cart: action.payload,
        loading: false,
      };
      break;
    case cartConstant.CART_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case cartConstant.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case cartConstant.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        addToCart: true,
        loading: false,
      };
      break;
    case cartConstant.ADD_TO_CART_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
    case cartConstant.REMOVE_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case cartConstant.REMOVE_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case cartConstant.REMOVE_CART_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
  }
  return state;
};
