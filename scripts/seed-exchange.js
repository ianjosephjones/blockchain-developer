const Token = artifacts.require('Token');
const Exchange = artifacts.require('Exchange');

module.exports = async function (callback) {
	try {
		// fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts();

		console.log('script running');
	} catch (error) {
		console.log(error);
	}

	callback();
};
