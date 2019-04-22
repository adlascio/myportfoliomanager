import { combineReducers } from "redux";
import transactionReducer from "./transactionReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import dividendReducer from "./dividendReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  transaction: transactionReducer,
  error: errorReducer,
  auth: authReducer,
  dividend: dividendReducer,
  dashboard: dashboardReducer
});
