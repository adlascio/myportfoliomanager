import axios from "axios";
import { GET_DASHBOARD, DASHBOARD_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getDashboard = () => (dispatch, getState) => {
  dispatch(setDashboardLoading());
  axios
    .get("/api/dashboard", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_DASHBOARD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setDashboardLoading = () => {
  return {
    type: DASHBOARD_LOADING
  };
};
