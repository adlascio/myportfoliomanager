import axios from "axios";
import {
  GET_DIVIDENDS,
  ADD_DIVIDENDS,
  DELETE_DIVIDENDS,
  DIVIDENDS_LOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getDividends = () => (dispatch, getState) => {
  dispatch(setDividendsLoading());
  axios
    .get("/api/dividends", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_DIVIDENDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteDividends = id => (dispatch, getState) => {
  axios
    .delete(`/api/dividends/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_DIVIDENDS,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addDividends = transaction => (dispatch, getState) => {
  axios
    .post("/api/dividends", transaction, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_DIVIDENDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setDividendsLoading = () => {
  return {
    type: DIVIDENDS_LOADING
  };
};
