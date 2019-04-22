import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getDividends, deleteDividends } from "../actions/dividendActions";
import PropTypes from "prop-types";
import DividendModal from "./DividendModal";

class Dividends extends Component {
  componentDidMount() {
    this.props.getDividends();
  }

  onDeleteClick = id => {
    this.props.deleteDividends(id);
  };
  static propTypes = {
    getDividends: PropTypes.func.isRequired,
    dividend: PropTypes.object.isRequired
  };

  render() {
    const { dividends } = this.props.dividend;
    return (
      <Container>
        <DividendModal />
        <Table striped hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Value</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {dividends.map(dividend => (
              <tr key={dividend._id}>
                <th scope="row">{dividend.code}</th>
                <td>{dividend.value}</td>
                <td>{dividend.date}</td>
                <td>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, dividend._id)}
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

const mapStateToProps = state => ({
  dividend: state.dividend
});

export default connect(
  mapStateToProps,
  { getDividends, deleteDividends }
)(Dividends);
