/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';
import { Console } from 'console';
import { APTOS_NODE_URL } from '../constants/aptos.constant';

// const address = '0x09e161f7a5f223d8852594af6f8b20ea9717c9114d16d9c23b66c1f0d6f4734d';
// const collectName = 'Metaverse Collectible';
// const tokenName = 'test #2';

//  signHexString by AptosAccount

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

// export const getChainId = async () => {
