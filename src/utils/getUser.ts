import { walletClient } from './aptos';

const getBalanceUser = async (address: any): Promise<number> => {
	// console.log(address);
	let balance = await walletClient.getBalance(address);
	return balance;
};

const getListItemWallet = async (address: string) => {
	const data = await walletClient.getTokenIds(address, 100, 0, 0);
	const tokens = await Promise.all(
		data.tokenIds
			.filter((i) => i.difference != 0)
			.map(async (i) => {
				const token = await walletClient.getToken(i.data);
				return {
					propertyVersion: i.data.property_version,
					creator: i.data.token_data_id.creator,
					collection: token.collection,
					name: token.name,
					description: token.description,
					uri: token.uri,
					maximum: token.maximum,
					supply: token.supply,
				};
			})
	);
	return tokens;
};

export { getBalanceUser, getListItemWallet };
