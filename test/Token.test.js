import { tokens, EVM_REVERT } from './helpers';

// Test Smart Contract with Truffle
const Token = artifacts.require('./Token');

require('chai').use(require('chai-as-promised')).should();

contract('Token', ([deployer, receiver, exchange]) => {
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

		describe('success', () => {
			beforeEach(async () => {
				// Transfer
				amount = tokens(100);
				result = await token.transfer(receiver, amount, { from: deployer });
			});
			it('transfers tokens balances', async () => {
				let balanceOf;
				// Before transfer
				// balanceOf = await token.balanceOf(deployer);
				// console.log('deployer balance before transfer', balanceOf.toString());
				// balanceOf = await token.balanceOf(receiver);
				// console.log('receiver balance before transfer', balanceOf.toString());

				// Before transfer
				balanceOf = await token.balanceOf(deployer);
				balanceOf.toString().should.equal(tokens(12311920).toString());
				// console.log('deployer balance after transfer', balanceOf.toString());
				// After Transfer
				balanceOf = await token.balanceOf(receiver);
				balanceOf.toString().should.equal(tokens(100).toString());
				// console.log('receiver balance after transfer', balanceOf.toString());
			});
			it('emits a transfer event', async () => {
				const log = result.logs[0];
				log.event.should.eq('Transfer');
				const event = log.args;
				event.from.toString().should.equal(deployer, 'from is correct');
				event.to.should.equal(receiver, 'to is correct');
				event.value
					.toString()
					.should.equal(amount.toString(), 'value is correct');
			});
		});
		describe('failure', () => {
			it('rejects insufficient balances', async () => {
				let invalidAmount;
				invalidAmount = tokens(1000000000); // 1 billion - greater than total supply
				await token
					.transfer(receiver, invalidAmount, { from: deployer })
					.should.be.rejectedWith(EVM_REVERT);

				// Attempt transfer tokens, when you have none
				invalidAmount = tokens(10); // recipient has no tokens
				await token
					.transfer(deployer, invalidAmount, { from: receiver })
					.should.be.rejectedWith(EVM_REVERT);
			});

			it('rejects invalid recipients', async () => {
				await token.transfer(0x0, amount, { from: deployer }).should.be
					.rejected;
			});
		});
	});
	describe('approving tokens', () => {
		let result;
		let amount;

		beforeEach(async () => {
			amount = tokens(100);
			result = await token.approve(exchange, amount, { from: deployer });
		});

		describe('success', () => {
			it('allocates an allowance for delegated token spending on exchange', async () => {
				const allowance = await token.allowance(deployer, exchange);
				allowance.toString().should.equal(amount.toString());
			});
			it('emits an Approval event', async () => {
				const log = result.logs[0];
				log.event.should.eq('Approval');
				const event = log.args;
				event.owner.toString().should.equal(deployer, 'owner is correct');
				event.spender.should.equal(exchange, 'spender is correct');
				event.value
					.toString()
					.should.equal(amount.toString(), 'value is correct');
			});
		});
		describe('failure', () => {
			it('rejects invalid recipients', async () => {
				await token.approve(0x0, amount, { from: deployer }).should.be.rejected;
			});
		});
	});
	describe('sending tokens', () => {
		let result;
		let amount;

		describe('success', () => {
			beforeEach(async () => {
				amount = tokens(100);
				result = await token.transfer(receiver, amount, { from: deployer });
			});

			it('transfers token balances', async () => {
				let balanceOf;
				balanceOf = await token.balanceOf(deployer);
				balanceOf.toString().should.equal(tokens(12311920).toString());
				balanceOf = await token.balanceOf(receiver);
				balanceOf.toString().should.equal(tokens(100).toString());
			});

			it('resets the allowance', async () => {
				const allowance = await token.allowance(deployer, exchange);
				allowance.toString().should.equal('0');
			});

			it('emits a transfer event', async () => {
				const log = result.logs[0];
				log.event.should.eq('Transfer');
				const event = log.args;
				event.from.toString().should.equal(deployer, 'from is correct');
				event.to.should.equal(receiver, 'to is correct');
				event.value
					.toString()
					.should.equal(amount.toString(), 'value is correct');
			});
		});
		describe('failure', () => {
			it('rejects insufficient balances', async () => {
				// attempt transfer too many tokens
				const invalidAmount = tokens(1000000000);
				token
					.transferFrom(deployer, receiver, invalidAmount, { from: exchange })
					.should.be.rejectedWith(EVM_REVERT);
			});
			it('rejects invalid recipients', async () => {
				await token.transferFrom(deployer, 0x0, amount, { from: exchange })
					.should.be.rejected;
			});
		});
	});
});
