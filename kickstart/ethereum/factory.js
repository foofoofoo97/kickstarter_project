import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xaBef6935425A433Cd3d73684e96CB1A8C9D51505"
);

export default instance;
