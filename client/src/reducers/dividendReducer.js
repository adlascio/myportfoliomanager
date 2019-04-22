import {
  GET_DIVIDENDS,
  ADD_DIVIDENDS,
  DELETE_DIVIDENDS,
  DIVIDENDS_LOADING
} from "../actions/types";

const initialState = {
  dividends: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DIVIDENDS:
      return {
        ...state,
        dividends: action.payload,
        loading: false
      };
    case DELETE_DIVIDENDS:
      return {
        ...state,
        dividends: state.dividends.filter(
          dividend => dividend._id !== action.payload
        )
      };
    case ADD_DIVIDENDS:
      return {
        ...state,
        dividends: [action.payload, ...state.dividends]
      };
    case DIVIDENDS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
