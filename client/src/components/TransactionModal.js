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
import uuid from "uuid";

class TransactionModal extends Component {
  state = {
    modal: false,
    code: "",
    sharePrice: null,
    shareQty: null
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
    const newTransaction = {
      id: uuid(),
      code: this.state.code
    };

    this.props.addTransactions(newTransaction);

    this.toggle();
  };

  render() {
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
