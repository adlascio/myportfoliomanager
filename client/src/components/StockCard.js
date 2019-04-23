import React from "react";

class StockCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stock } = this.props;
    const stockPrice = stock.stockPrice.toFixed(2);
    const marketValue = stockPrice * stock.shareQty;
    const totalCost = stock.shareQty * stock.averagePrice;
    const dividends = stock.dividends ? stock.dividends : 0;
    const totalReturn = marketValue - totalCost + dividends;
    return (
      <div className={"card m-b-20"}>
        <div className={"row"}>
          <div className={"col-7"}>
            <h5>{stock.code}</h5>
          </div>
          <div className={"col-5"}>
            <h5>${stockPrice}</h5>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-7"}>
            <h6>Average Price:</h6>
          </div>
          <div className={"col-5"}>
            <h6>${stock.averagePrice.toFixed(2)}</h6>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-7"}>
            <h6>Total Cost:</h6>
          </div>
          <div className={"col-5"}>
            <h6>${totalCost.toFixed(2)}</h6>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-7"}>
            <h6>Dividends:</h6>
          </div>
          <div className={"col-5"}>
            <h6>${dividends.toFixed(2)}</h6>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-7"}>
            <h6>Market Value:</h6>
          </div>
          <div className={"col-5"}>
            <h6>${marketValue.toFixed(2)}</h6>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-7"}>
            <h6>Total Return:</h6>
          </div>
          <div className={"col-5"}>
            <h6>${totalReturn.toFixed(2)}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default StockCard;
