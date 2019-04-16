import axios from "axios";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  TRANSACTIONS_LOADING
} from "./types";

export const getTransactions = () => dispatch => {
  dispatch(setTransactionsLoading());
  axios.get("/api/transactions").then(res =>
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    })
  );
};

export const deleteTransactions = id => {
  return {
    type: DELETE_TRANSACTIONS,
    payload: id
  };
};

export const addTransactions = transaction => {
  return {
    type: ADD_TRANSACTIONS,
    payload: transaction
  };
};

export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  };
};
