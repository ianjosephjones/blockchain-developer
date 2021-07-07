import { tokens, EVM_REVERT } from './helpers';

// Test Smart Contract with Truffle
const Exchange = artifacts.require('./Exchange');

require('chai').use(require('chai-as-promised')).should();

contract('Exchange', ([deployer, feeAccount]) => {
	let exchange;
	const feePercent = 10;
	beforeEach(async () => {
		// Fetch token from blockchain
		exchange = await Exchange.new(feeAccount, feePercent);
	});

	describe('deloyment', () => {
		it('tracks the fee account', async () => {
			const result = await exchange.feeAccount();
			result.should.equal(feeAccount);
		});
		it('tracks the fee precent', async () => {
			const result = await exchange.feePercent();
			result.toString().should.equal(feePercent.toString());
		});
	});
});
