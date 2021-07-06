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
        totalSupply = 12312020 * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[msg.sender].add(_value);
        return true;
    }
}
