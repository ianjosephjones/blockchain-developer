pragma solidity ^0.5.0;

contract Exchange {
    // Variables
    address public feeAccount; // The account that recieves the exchage fees
    uint256 public feePercent;

    constructor(address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }
}
// TODO:
// [ ] Set the fee account
// [ ] Deposit Ether
// [ ] Withdraw Ether
// [ ] Deposit tokens
// [ ] Withdraw tokens
// [ ] Check balances
// [ ] Make order
// [ ] Cancel order
// [ ] Fill order
// [ ] Charge fees
