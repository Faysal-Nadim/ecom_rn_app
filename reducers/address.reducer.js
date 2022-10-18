import { addressConstant } from "../actions/constants";

const initState = {
  address: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case addressConstant.ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case addressConstant.ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload,
      };
      break;
    case addressConstant.ADDRESS_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
  }
  return state;
};
