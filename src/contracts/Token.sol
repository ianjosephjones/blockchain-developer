pragma solidity >=0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token {
    using SafeMath for uint256;
    // Variables
    string public name = "Copeland Token";
    string public symbol = "Coe";
    uint256 public decimals = 18;
    uint256 public totalSupply;

    // Track Balances
    mapping(address => uint256) public balanceOf;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);

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
        require(_to != address(0));
        require(balanceOf[msg.sender] >= _value);
        balanceOf[_to] = balanceOf[msg.sender].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
