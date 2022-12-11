require("@nomicfoundation/hardhat-toolbox");
// Import dotenv to get access to .env
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

// Get rpc url and private key to use in goerli network
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    // Default local fake network
    defaultNetwork: "hardhat",
    // Adding external network
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    solidity: "0.8.7",
};
