/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';
import { Console } from 'console';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS =
	process.env.REACT_APP_MARKET_ADDRESS ||
	'0x5501332ea130b2bc65a0f2531d62c26cb2c7086f856632a6a579e99ed0f186c5';

const chainId = '2';
// const tokenId = {
// 	token_data_id: {
// 		creator: address,
// 		collection: collectName,
// 		name: tokenName,
// 	},
// 	property_version: 0,
// };

export const getBalanceToken = async (
	address: string,
	creator: string,
	collection: string,
	name: string,
	chainId: string = '2'
) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let tokenClient = new TokenClient(client);
	const tokenId: any = {
		token_data_id: {
			creator: creator,
			collection: collection,
			name: name,
		},
		property_version: '0',
	};
	return tokenClient.getTokenForAccount(address, tokenId).then((res) => {
		return res.amount;
	});
};

export const getCollectionData = async (creator: string, collectionName: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let tokenClient = new TokenClient(client);
	return tokenClient.getCollectionData(creator, collectionName);
};

export const getItemData = async (creator: string, collectionName: string, itemName: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let tokenClient = new TokenClient(client);

	return tokenClient.getTokenData(creator, collectionName, itemName);
};

export const getTokenFromResource = async () => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let data = await client.getAccountResources(
		'0x2709ce0b27f0b4ff85ab2b28dceaf546c76c6b8365072935d9aa65406eebbc04'
	);
	data = data
		.filter((item: any) => {
			return item.type.includes('market::TokenInfo');
		})
		.map((item: any) => item.data.token_list)
		.reduce((a: any, b: any) => a.concat(b), []);
	return data;
};
