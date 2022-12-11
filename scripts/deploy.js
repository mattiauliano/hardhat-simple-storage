// Imports: run to do hardhat's tasks, network to get network configuration infos
const { ethers, run, network } = require("hardhat"); // Run allow us to run any hardhat task in our code
require("dotenv").config();

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
    console.log(`Deployed contract to: ${simpleStorage.address}`);
    // Check if the current network is a goerli network and if ETHERSCAN_API_KEY exist
    // Can't verify contract in hardhat network
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        // Wait for 6 confirmation blocks
        await simpleStorage.deployTransaction.wait(6);
        // Verify simpleStorage contract with no constructors
        await verify(simpleStorage.address, []);
    }

    // Interacting with simple storage contract
    // Get initial favorite number
    const initialFavoriteNumber = await simpleStorage.retrieve();
    console.log(`Initial favorite number: ${initialFavoriteNumber}`);

    // Update favorite number
    const transactionResponse = await simpleStorage.store(15);
    await transactionResponse.wait(1);

    // Get updated favorite number
    const updatedFavoriteNumber = await simpleStorage.retrieve();
    console.log(`Updated favorite number: ${updatedFavoriteNumber}`);
}

// Async function to automatically verify deployed contract
async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    // Avoiding blocking code with try and catch
    try {
        // The first parameter is the task and his option
        // The second parameter is an obj with the actual parameters of the function
        await run("verify:verify", {
            address: contractAddress,
            constructorArgs: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}

// Main call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
