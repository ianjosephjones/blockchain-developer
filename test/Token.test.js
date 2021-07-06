// Test Smart Contract with Truffle
const Token = artifacts.require('./Token');

require('chai').use(require('chai-as-promised')).should();

contract('Token', (accounts) => {
	const name = 'My Name';
	const symbol = 'Symbol';
	const decimals = 10;
	const totalSupply = 10;
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
			result.should.equal(decimals);
		});
		it('track the total supply', async () => {
			const result = await token.totalSupply();
			result.should.equal(totalSupply);
		});
	});
});
