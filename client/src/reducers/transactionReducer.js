import uuid from "uuid";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  TRANSACTIONS_LOADING
} from "../actions/types";

const initialState = {
  transactions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false
      };
    case DELETE_TRANSACTIONS:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };
    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
