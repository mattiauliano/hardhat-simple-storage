// Import task function from hardhat/config to create a custom task
const { task } = require("hardhat/config");

// (Task's name, Task's description)
// setAction is the functionality executed once used task "block-number"
task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        // taskArgs are parameters added with addParam method
        // hre have access to all hardhat library
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blockNumber}`);
    }
);

// To import in others modules
module.exports = {};
