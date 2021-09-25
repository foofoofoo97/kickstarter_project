import React, { Component } from "react";
import Layout from "../../../components/Layout";
import {
  Header,
  Icon,
  Form,
  Input,
  Button,
  Message,
  Grid,
} from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class NewRequest extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const campaign = Campaign(this.props.address);
      const { description, value, recipient } = this.state;
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
    this.setState({
      loading: false,
      value: "",
      description: "",
      recipient: "",
    });
  };

  render() {
    return (
      <Layout>
        <Header as="h3">
          <Icon name="meh" />
          <Header.Content>Create a Request</Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Description</label>
                  <Input
                    value={this.state.description}
                    onChange={(event) => {
                      this.setState({ description: event.target.value });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Value In Ether</label>
                  <Input
                    value={this.state.value}
                    onChange={(event) => {
                      this.setState({ value: event.target.value });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Recipient</label>
                  <Input
                    value={this.state.recipient}
                    onChange={(event) => {
                      this.setState({ recipient: event.target.value });
                    }}
                  />
                </Form.Field>
                <Message
                  error
                  header="Opps"
                  content={this.state.errorMessage}
                />
                <Button primary loading={this.state.loading}>
                  Add Request
                </Button>
              </Form>
              <br />
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button secondary>Back</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default NewRequest;
