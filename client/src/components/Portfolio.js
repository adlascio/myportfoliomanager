import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import {
  getTransactions,
  deleteTransactions
} from "../actions/transactionActions";
import PropTypes from "prop-types";

class Portfolio extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  onDeleteClick = id => {
    this.props.deleteTransactions(id);
  };

  render() {
    const { transactions } = this.props.transaction;
    return (
      <Container>
        <Table striped hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Cost</th>
              <th>Type</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id}>
                <th scope="row">{transaction.code}</th>
                <td>{transaction.shareQty}</td>
                <td>${transaction.sharePrice}</td>
                <td>${transaction.sharePrice * transaction.shareQty}</td>
                <td>{transaction.type}</td>
                <td>{transaction.date}</td>
                <td>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, transaction._id)}
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

Portfolio.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(
  mapStateToProps,
  { getTransactions, deleteTransactions }
)(Portfolio);
