import { GET_DASHBOARD, DASHBOARD_LOADING } from "../actions/types";

const initialState = {
  dashboard: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
        loading: false
      };
    case DASHBOARD_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
