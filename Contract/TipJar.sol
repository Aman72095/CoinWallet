// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract TipJar {
    struct Tip {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Tip[] tips;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function sendTip(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please send an amount greater than 0 ether");
        owner.transfer(msg.value);
        tips.push(Tip(name, message, block.timestamp, msg.sender));
    }

    function getTips() public view returns (Tip[] memory) {
        return tips;
    }
}
