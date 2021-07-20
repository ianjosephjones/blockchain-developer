const { ether } = require('../test/helpers');

const Token = artifacts.require('Token');
const Exchange = artifacts.require('Exchange');

module.exports = async function (callback) {
	try {
		// fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts();

		// fetch the deployed token
		const token = await Token.deployed();
		console.log('Token Fetched', token.address);
		// fetch the deployed exchange
		const exchange = await Exchange.deployed();
		console.log('Token Fetched', exchange.address);

		// Give tokens to account[1]
		const sender = accounts[0];
		const receiver = accounts[1];
		let amount = web3.unils.toWei('10000', 'ether'); // 10,000 tokens

		await token.transfer(receiver, amount, { from: sender });
		console.log(`Transferred ${amount} tokens from ${sender} to ${receiver}`);

		// set up exchange users
		const user1 = accounts[0];
		const user2 = accounts[1];

		// User 1 deposits ether
		amount = 1;
		await exchange.depositEther({ from: user1, value: ether(amount) });
		console.log(`Deposited ${amount} Ether from ${user1}`);
		// User 2 approves tokens
		amount = 10000;
		await token.approve(exchange.address, tokens(amount), { from: user2 });
		console.log(`Approved ${amount} tokens from ${user2}`);
		// User 2 deposits tokens
		await exchange.depositToken(token.address, tokens(amount), { from: user2 });
		console.log(`Deposited ${amount} tokens from ${user2}`);

		console.log('script running');
	} catch (error) {
		console.log(error);
	}

	callback();
};