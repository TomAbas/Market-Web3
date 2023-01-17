/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient } from 'aptos';
import { Console } from 'console';
import { APTOS_NODE_URL } from '../constants/aptos.constant';

const address = '0x09e161f7a5f223d8852594af6f8b20ea9717c9114d16d9c23b66c1f0d6f4734d';
// const collectName = 'Metaverse Collectible';
// const tokenName = 'test #2';
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
	// const resources = await this.aptosClient.getAccountResources(creator);
	// const accountResource: { type: Gen.MoveStructTag; data: any } = resources.find(
	// 	(r) => r.type === '0x3::token::Collections'
	// )!;
	// const { handle }: { handle: string } = accountResource.data.collection_data;
	// const getCollectionTableItemRequest: Gen.TableItemRequest = {
	// 	key_type: '0x1::string::String',
	// 	value_type: '0x3::token::CollectionData',
	// 	key: collectionName,
	// };
};
// getBalanceToken(address, tokenId);
// new Promise((resolve, reject) => {});
// const bobBalance3 = await tokenClient.getTokenForAccount(bob.address(), tokenId);
