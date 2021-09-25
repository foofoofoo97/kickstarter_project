import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Button, Card, Header, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <Header as="h3">
            <Icon name="ethereum" />
            <Header.Content>Open Campaigns</Header.Content>
          </Header>
          <br />
          <Link route="/campaigns/new">
            <a>
              <Button
                content="Create Campaign"
                icon="add circle"
                primary
                floated="right"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
          <br />
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
