// Test Smart Contract with Truffle
const Token = artifacts.require('./Token');

require('chai').use(require('chai-as-promised')).should();

contract('Token', (accounts) => {
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
	});
});
