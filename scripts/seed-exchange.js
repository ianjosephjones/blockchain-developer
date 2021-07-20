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

        

		console.log('script running');
	} catch (error) {
		console.log(error);
	}

	callback();
};
