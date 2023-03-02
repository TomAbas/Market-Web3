import { walletClient } from './aptos';

const getBalanceUser = async (address: any): Promise<number> => {
	let balance = await walletClient.getBalance(address);
	return balance;
};

export { getBalanceUser };
