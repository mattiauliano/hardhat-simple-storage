require("@nomicfoundation/hardhat-toolbox");
// Import dotenv to get access to .env
require("dotenv").config();
// Import hardhat-ethers to verify contracts
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */

// Get rpc url and private key to use in goerli network
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

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
    // Adding a new command "verify"
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    solidity: "0.8.7",
};
