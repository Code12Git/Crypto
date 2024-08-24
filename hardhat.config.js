require("@nomiclabs/hardhat-ethers");
const apiKey = process.env.REACT_APP_PRIVATE_KEY
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [`0x${apiKey}`],
    },
  },
};
