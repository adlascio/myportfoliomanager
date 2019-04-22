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
import { addDividends } from "../actions/dividendActions";

class DividendModal extends Component {
  state = {
    modal: false,
    code: "",
    value: null,
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
    if (!this.state.code || !this.state.value || !this.state.date) {
      return;
    }
    const newDividend = {
      code: this.state.code,
      value: this.state.value,
      date: this.state.date
    };

    this.props.addDividends(newDividend);
    this.setState({
      code: "",
      value: null,
      date: null
    });

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
          Add Dividend
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Dividends</ModalHeader>
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
                <Label for="value">Value</Label>
                <Input
                  type="number"
                  name="value"
                  id="value"
                  step=".01"
                  placeholder="Add value"
                  onChange={this.onChange}
                />
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
                  Add Dividend
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
  dividend: state.dividend
});

export default connect(
  mapStateToProps,
  { addDividends }
)(DividendModal);
