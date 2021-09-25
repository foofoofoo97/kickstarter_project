import React, { Component } from "react";
import { Button, Table, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  state = {
    loadingApprove: false,
    loadingFinalize: false,
  };

  onFinalize = async () => {
    this.setState({ loadingFinalize: true });
    this.props.cleanError();

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
      this.props.callback();
    } catch (e) {
      this.props.errorHandler(e);
    }
    this.setState({ loadingFinalizes: false });
  };

  onApprove = async () => {
    this.setState({ loadingApprove: true });
    this.props.cleanError();

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(this.props.id)
        .send({ from: accounts[0] });
      this.props.callback();
    } catch (e) {
      this.props.errorHandler(e);
    }
    this.setState({ loadingApprove: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              basic
              loading={this.state.loadingApprove}
              color="green"
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              basic
              loading={this.state.loadingFinalize}
              color="teal"
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}
export default RequestRow;
