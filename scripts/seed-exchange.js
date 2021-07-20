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

        

		console.log('script running');
	} catch (error) {
		console.log(error);
	}

	callback();
};
