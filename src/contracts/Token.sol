pragma solidity >=0.5.0;

contract Token {
    string public name = "Copeland Token";
    string public symbol = "Coe";
    uint256 public decimals = 18;
    uint256 public totalSupply;

    // Track Balances
    mapping(address => uint256) public balanceOf;

    // Send Tokens

    constructor() public {
        totalSupply = 1000000 * (10**decimals);
    }
}
