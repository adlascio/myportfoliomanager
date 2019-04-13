import {
  GET_TRANSACTIONS,
  ADD_TRANSACTIONS,
  DELETE_TRANSACTIONS
} from "./types";

export const getTransactions = () => {
  return {
    type: GET_TRANSACTIONS
  };
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
