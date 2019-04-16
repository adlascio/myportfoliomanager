import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addTransactions } from "../actions/transactionActions";

class TransactionModal extends Component {
  state = {
    modal: false,
    code: "",
    sharePrice: null,
    shareQty: null,
    type: "",
    date: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      !this.state.code ||
      !this.state.shareQty ||
      !this.state.type ||
      !this.state.date
    ) {
      return;
    }
    const newTransaction = {
      code: this.state.code,
      shareQty: this.state.shareQty,
      sharePrice: this.state.sharePrice,
      type: this.state.type,
      date: this.state.date
    };

    this.props.addTransactions(newTransaction);
    this.setState({
      code: "",
      sharePrice: null,
      shareQty: null,
      type: "",
      date: null
    });

    this.toggle();
  };

  render() {
    const totalCost = this.state.sharePrice * this.state.shareQty;
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Transaction
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Portfolio</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="code">Stock code</Label>
                <Input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Add stock code"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="shareQty">Share Quantity</Label>
                <Input
                  type="number"
                  name="shareQty"
                  id="shareQty"
                  placeholder="Add share quantity"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="sharePrice">Share Price</Label>
                <Input
                  type="number"
                  name="sharePrice"
                  id="sharePrice"
                  placeholder="Add share price"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="totalCost">Total Cost</Label>
                <Input
                  type="text"
                  name="totalCost"
                  id="totalCost"
                  value={totalCost}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <Label for="totalCost">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  onChange={this.onChange}
                  defaultValue=""
                >
                  <option value="">Select type</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Transaction
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(
  mapStateToProps,
  { addTransactions }
)(TransactionModal);
