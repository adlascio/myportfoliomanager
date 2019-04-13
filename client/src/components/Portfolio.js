import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

class Portfolio extends Component {
  state = {
    transactions: [
      { id: uuid(), code: "AAPL", shareQty: 1, sharePrice: 10, type: "Buy" },
      { id: uuid(), code: "QSR", shareQty: 2, sharePrice: 14, type: "Sell" },
      { id: uuid(), code: "T", shareQty: 4, sharePrice: 12, type: "Buy" },
      { id: uuid(), code: "EMA", shareQty: 3, sharePrice: 15, type: "Sell" }
    ]
  };

  render() {
    const { transactions } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const code = prompt("Enter stock code:");
            const shareQty = prompt("Enter share qty:");
            const sharePrice = prompt("Enter share price:");
            const type = prompt("Enter type of transaction:");
            if (sharePrice && code && shareQty && type) {
              this.setState(state => ({
                transactions: [
                  ...state.transactions,
                  { id: uuid(), code, shareQty, sharePrice, type }
                ]
              }));
            }
          }}
        >
          Add Transaction
        </Button>
        <ListGroup>
          <TransitionGroup className="transactions-list">
            {transactions.map(({ id, code }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState(state => ({
                        transactions: state.transactions.filter(
                          transaction => transaction.id !== id
                        )
                      }));
                    }}
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

export default Portfolio;
