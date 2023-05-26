// SPDX-License-Identifier: UNLICENCED
pragma solidity 0.8.0;

contract ElectionContract {
    string greeting = "Hello";

    function greeter(string memory mygreeting) public {
        greeting = mygreeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}
