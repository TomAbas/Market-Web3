/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';
import { Console } from 'console';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS =
	process.env.REACT_APP_MARKET_ADDRESS ||
	'0xed08f5856d2e5a1ab7282964922b7ec8c18b85c911d99b3f23eb25af5965d270';

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
	let data = await client.getAccountResources(MARKET_ADDRESS);
	data = data
		.filter((item: any) => {
			return item.type.includes('nft::TokenInfo');
		})
		.map((item: any) => item.data.token_list)
		.reduce((a: any, b: any) => a.concat(b), []);
	console.log('itemResource', data);
	return data;
};
