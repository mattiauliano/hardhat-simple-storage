// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Creating a contract
contract SimpleStorage {
    // Initial value to zero
    uint256 favoriteNumber;

    // Mapping to get the respective number from a name
    mapping(string => uint256) public nameToFavoriteNumber;

    // Creating a dynamic array of People(our struct) type
    People[] public people;

    // Creating a struct to describe person
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // Add new person to the people array and assign favorite number in nameToFavoriteNumber
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber; // Mapping execution
    }

    // Store favoriteNumber
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    // Get favoriteNumber
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
