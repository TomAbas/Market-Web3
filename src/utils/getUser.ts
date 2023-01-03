import { walletClient } from './aptos';

const getBalanceUser = async (address: any): Promise<number> => {
	// console.log(address);
	let balance = await walletClient.getBalance(address);
	return balance;
};

export { getBalanceUser };
