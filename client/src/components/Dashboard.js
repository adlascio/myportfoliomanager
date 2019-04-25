import React, { Component } from "react";
import { Container } from "reactstrap";
import { getDashboard } from "../actions/dashboardActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StockCard from "./StockCard";

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
    let capitalGains = 0;
    let dividends = 0;
    if (dashboard && Object.keys(dashboard).length > 0) {
      Object.keys(dashboard).forEach(stockCode => {
        const stock = dashboard[stockCode];
        capitalGains +=
          stock.shareQty * stock.stockPrice -
          stock.shareQty * stock.averagePrice;
        capitalGains += dashboard[stockCode].capitalGain
          ? dashboard[stockCode].capitalGain
          : 0;
        dividends += dashboard[stockCode].dividends
          ? dashboard[stockCode].dividends
          : 0;
      });
    }
    let totalReturn = capitalGains + dividends;
    return (
      <Container>
        <h3 className={"m-b-20"}>Dashboard</h3>
        <div className={"row"} style={{ textAlign: "center" }}>
          <div className={"col-4"}>
            <h1>${capitalGains.toFixed(2)}</h1>
            <h5>Capital Gains</h5>
          </div>
          <div className={"col-4"}>
            <h1>${dividends.toFixed(2)}</h1>
            <h5>Dividends</h5>
          </div>
          <div className={"col-4"}>
            <h1>${totalReturn.toFixed(2)}</h1>
            <h5>Total Return</h5>
          </div>
        </div>
        <div className={"row"}>
          {dashboard && Object.keys(dashboard).length > 0 ? (
            Object.keys(dashboard).map(stock => {
              return <StockCard stock={dashboard[stock]} />;
            })
          ) : (
            <h3 style={{ marginTop: "30px" }}>
              Let's get started! Go to <a href="/transactions">Transactions</a>{" "}
              and add some to calculate your gains!
            </h3>
          )}
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
