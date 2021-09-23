import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xA34Eba0FDef9a619d3B747B24f5C7A51523e38De"
);

export default instance;
