import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Portfolio from "./components/Portfolio";
import Home from "./components/Home";
import Dividends from "./components/Dividends";
import { Container } from "reactstrap";

import { Provider, connect } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Container>
          <h4>Please, log in first.</h4>
        </Container>
      )
    }
  />
);

class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              path="/transactions"
              component={Portfolio}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/dividends"
              component={Dividends}
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(App);
