import { categoryConstant } from "../actions/constants";

const initState = {
  categories: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstant.CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload,
        loading: false,
      };
      break;
    case categoryConstant.CATEGORY_FAILURE:
      state = {
        ...initState,
        error: action.payload,
      };
      break;
  }
  return state;
};
