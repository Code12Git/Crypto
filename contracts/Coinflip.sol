// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Coinflip {
    address public owner;
    IERC20 public token;
    
    constructor(address tokenAddress) {
        owner = msg.sender;
        token = IERC20(tokenAddress);
    }

    function flipCoin(bool betOnHeads, uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(amount > 0, "Bet amount must be greater than 0");

        // Transfer tokens to the contract
        require(token.transfer(address(this), amount), "Transfer failed");

        // Simulate coin flip
        bool result = (block.timestamp % 2 == 0); // Simple pseudo-random result
        if (result == betOnHeads) {
            // Winner: Transfer double tokens back
            require(token.transfer(msg.sender, amount * 2), "Transfer failed");
        }
        // Loser: Tokens are not returned
    }

    function withdrawTokens(uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(token.transfer(owner, amount), "Transfer failed");
    }
}
