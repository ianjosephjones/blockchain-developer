import { tokens } from './helpers';

// Test Smart Contract with Truffle
const Token = artifacts.require('./Token');

require('chai').use(require('chai-as-promised')).should();

contract('Token', ([deployer, receiver]) => {
	const name = 'Copeland Token';
	const symbol = 'Coe';
	const decimals = '18';
	const totalSupply = tokens(12312020).toString();
	let token;
	beforeEach(async () => {
		// Fetch token from blockchain
		token = await Token.new();
	});
	describe('deloyment', () => {
		it('tracks the name', async () => {
			// Read token name here
			const result = await token.name();
			// the token name is "My Name"
			result.should.equal(name);
		});
		it('track the symbol', async () => {
			const result = await token.symbol();
			result.should.equal(symbol);
		});
		it('track the decimals', async () => {
			const result = await token.decimals();
			result.toString().should.equal(decimals);
		});
		it('track the total supply', async () => {
			const result = await token.totalSupply();
			result.toString().should.equal(totalSupply.toString());
		});

		it('assigns the total supply to the deployer', async () => {
			const result = await token.balanceOf(deployer);
			result.toString().should.equal(totalSupply.toString());
		});
	});

	describe('sending tokens', () => {
		let result;
		let amount;		
		beforeEach(async () => {
			// Transfer
			amount = tokens(100);
			result = await token.transfer(receiver, amount, { from: deployer });
		});
		it('transfers tokens balances', async () => {
			let balanceOf;
			// Before transfer
			balanceOf = await token.balanceOf(deployer);
			console.log('deployer balance before transfer', balanceOf.toString());
			balanceOf = await token.balanceOf(receiver);
			console.log('receiver balance before transfer', balanceOf.toString());

			// After Transfer
			balanceOf = await token.balanceOf(deployer);
			balanceOf.toString().should.equal(tokens(12311920).toString());
			console.log('deployer balance after transfer', balanceOf.toString());
			balanceOf = await token.balanceOf(receiver);
			balanceOf.toString().should.equal(tokens(12312020).toString());
			console.log('receiver balance after transfer', balanceOf.toString());
		});
	});
});
