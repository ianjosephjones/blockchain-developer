// Test Smart Contract with Truffle
const Token = artifacts.require('./Token');

require('chai').use(require('chai-as-promised')).should();

contract('Token', ([deployer, receiver]) => {
	const name = 'Copeland Token';
	const symbol = 'Coe';
	const decimals = '18';
	const totalSupply = '12312020000000000000000000';
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
			result.toString().should.equal(totalSupply);
		});

		it('assigns the total supply to the deployer', async () => {
			const result = await token.balanceOf(deployer);
			result.toString().should.equal(totalSupply);
		});
	});

	describe('sending tokens', () => {
		it('transfers tokens balances', async () => {
			let balanceOf;
			// Before transfer
			balanceOf = await token.balanceOf(deployer);
			console.log('deployer balance before transfer', balanceOf);
			balanceOf = await token.balanceOf(receiver);
			console.log('receiver balance before transfer', balanceOf.toString());

			// Transfer
			await token.transfer(receiver, '1000000000000000000', { from: deployer });
			// After Transfer
			balanceOf = await token.balanceOf(deployer);
			console.log('deployer balance after transfer', balanceOf);
			balanceOf = await token.balanceOf(receiver);
			console.log('receiver balance after transfer', balanceOf.toString());
		});
	});
});
