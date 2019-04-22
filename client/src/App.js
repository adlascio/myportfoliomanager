import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Portfolio from "./components/Portfolio";
import Home from "./components/Home";
import Dividends from "./components/Dividends";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/transactions" component={Portfolio} />
            <Route path="/dividends" component={Dividends} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
