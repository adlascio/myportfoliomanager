import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
        <ListGroup>
          <TransitionGroup className="transactions-list">
            {transactions.map(({ id, code }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    &times;
                  </Button>
                  {code}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
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
