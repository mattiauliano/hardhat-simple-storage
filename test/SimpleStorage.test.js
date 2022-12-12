// Importing ethers from hardhat to call function and deploy contracts
const { ethers } = require("hardhat");
// Importing assert and expect for testing purpose
const { expect, assert } = require("chai");

// This section will describe our contract SimpleStorage
describe("SimpleStorage", () => {
    // Scope here variables used in beforeEach
    let simpleStorageFactory;
    let simpleStorage;

    beforeEach(async () => {
        // Deploying a contract copy before each test
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Start with a favorite number of 0", async () => {
        const currentFavoriteNumber = await simpleStorage.retrieve();
        const expectedFavoriteNumber = "0";
        // Check if the given values are equal
        assert.equal(currentFavoriteNumber.toString(), expectedFavoriteNumber);
    });

    it("Change favorite number to 15", async () => {
        const initialFavoriteNumber = await simpleStorage.retrieve();
        const transactionResponse = await simpleStorage.store("15");
        await transactionResponse.wait(1);

        const updatedFavoriteNumber = await simpleStorage.retrieve();

        const expectedFavoriteNumber = "15";
        assert.equal(updatedFavoriteNumber, expectedFavoriteNumber);
    });

    it("Add person to people dynamic array", async () => {
        // Add first person
        const transactionFirstPerson = await simpleStorage.addPerson(
            "Mattia",
            "10"
        );
        await transactionFirstPerson.wait(1);
        // Add second person
        const transactionSecondPerson = await simpleStorage.addPerson(
            "Chiara",
            "13"
        );
        await transactionSecondPerson.wait(1);

        const length = await simpleStorage.getPeopleLength();
        const expectedLength = 2;
        assert.equal(length, expectedLength);
    });

    it("Get number from the name", async () => {
        const transactionResponse = await simpleStorage.addPerson(
            "Mattia",
            "10"
        );
        await transactionResponse.wait(1);

        const mattiaValue = await simpleStorage.nameToFavoriteNumber["Mattia"];
        const expectedValue = "10";
        assert.equal(mattiaValue, expectedValue);
    });
});
