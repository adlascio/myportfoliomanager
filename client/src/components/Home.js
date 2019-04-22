import React, { Component } from "react";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const notLogged = (
      <Container>
        <h2>Welcome to MyPortfolioManager!</h2>
      </Container>
    );
    return (
      <Container>
        {isAuthenticated === true ? <Dashboard /> : notLogged}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Home);
