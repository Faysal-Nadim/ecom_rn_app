import { orderConstant } from "../actions/constants";

const initState = {
  orders: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstant.ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstant.ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload,
        loading: false,
      };
      break;
    case orderConstant.ORDER_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
  }
  return state;
};
