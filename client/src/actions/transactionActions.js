import axios from "axios";
import {
  GET_TRANSACTIONS,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTIONS,
  TRANSACTIONS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTransactions = () => (dispatch, getState) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/transactions", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteTransactions = id => (dispatch, getState) => {
  axios
    .delete(`/api/transactions/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TRANSACTIONS,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addTransactions = transaction => (dispatch, getState) => {
  axios
    .post("/api/transactions", transaction, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_TRANSACTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING
  };
};
