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

export const deleteTransactions = id => dispatch => {
  axios.delete(`/api/transactions/${id}`).then(res =>
    dispatch({
      type: DELETE_TRANSACTIONS,
      payload: id
    })
  );
};

export const addTransactions = transaction => dispatch => {
  axios.post("/api/transactions", transaction).then(res =>
    dispatch({
      type: ADD_TRANSACTIONS,
      payload: res.data
    })
  );
};

export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  };
};
