import React, { Component } from "react";
import { Container } from "reactstrap";
import { getDashboard } from "../actions/dashboardActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashboard();
  }

  static propTypes = {
    getDashboard: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired
  };

  render() {
    const { dashboard } = this.props.dashboard;
    return (
      <Container>
        <h2 className={"m-b-20"}>Dashboard</h2>
        <div className={"card"}>
          <div className={"row"}>
            <div className={"col-6"}>
              <h5>Stock Name</h5>
            </div>
            <div className={"col-6"}>
              <h5>Stock Price</h5>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col-6"}>
              <h6>Average Price:</h6>
            </div>
            <div className={"col-6"} />
          </div>
          <div className={"row"}>
            <div className={"col-6"}>
              <h6>Market Value:</h6>
            </div>
            <div className={"col-6"} />
          </div>
          <div className={"row"}>
            <div className={"col-6"}>
              <h6>Total Return:</h6>
            </div>
            <div className={"col-6"} />
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { getDashboard }
)(Dashboard);
