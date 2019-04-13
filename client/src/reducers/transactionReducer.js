import uuid from "uuid";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTIONS
} from "../actions/types";

const initialState = {
  transactions: [
    { id: uuid(), code: "AAPL", shareQty: 1, sharePrice: 10, type: "Buy" },
    { id: uuid(), code: "QSR", shareQty: 2, sharePrice: 14, type: "Sell" },
    { id: uuid(), code: "T", shareQty: 4, sharePrice: 12, type: "Buy" },
    { id: uuid(), code: "FTS", shareQty: 3, sharePrice: 15, type: "Sell" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state
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
    default:
      return state;
  }
}
