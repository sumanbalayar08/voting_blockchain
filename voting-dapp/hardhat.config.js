require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/cccc5eead51e4b188cef3e9af254e8fa`, // Replace with your Infura Project ID
      accounts: [`0x${process.env.YOUR_WALLET_PRIVATE_KEY}`], // Make sure to set this in your .env file
    },
  },
};
