// Imports
const { ethers } = require("hardhat");

// Async main function
async function main() {
    // Hardhat takes abi, binary and create a wallet (privateKey and provider) in background
    // So we are ready to create the contract factory
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    // Contract gets deployed
    const simpleStorage = await SimpleStorageFactory.deploy();
    // Transaction receipt --> confirmation blocks
    await simpleStorage.deployed();
    // What's the private key and the rpc url?
    console.log(`Deployed contract to: ${simpleStorage.address}`);
}

// Main call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
