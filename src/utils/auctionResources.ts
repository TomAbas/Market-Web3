/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, TokenClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS || '';

const getBidAuction = async (auctionId: string, coinType: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(
		MARKET_ADDRESS,
		`${MARKET_ADDRESS}::auction::Auctions<${coinType}>`
	);
	let handle = data.all_active_auctions.handle;
	let dataAuction = await client.getTableItem(handle, {
		key_type: 'u64',
		value_type: `${MARKET_ADDRESS}::auction::Auction<${coinType}>`,
		key: auctionId,
	});

	return dataAuction;
};

const getBidUser = async (address: string, coinType: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let data: any = await client.getAccountResource(
		address,
		`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`
	);
	// let handle = data.store.handle;

	// let dataAuction = await client.getTableItem(handle, {
	// 	key_type: 'u64',
	// 	value_type: `${MARKET_ADDRESS}::auction::Auction<${coinType}>`,
	// 	key: auctionId,
	// });
	// console.log(dataAuction);
	// return dataAuction;
};

const getEventsByCreationNumber = async (address: string, coinType: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let data: any = await client
		.getEventsByEventHandle(
			address,
			`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`,
			'bid_event'
		)
		.then((res: any) => res);
	return data;
};

const getTokenData = async (address: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(MARKET_ADDRESS, `0x3::token::TokenStore`);
	console.log('data', data);
	let handle = data.tokens.handle;
	console.log(handle);
	let dataAuction = await client.getTableItem(handle, {
		key_type: '0x3::token::TokenId',
		value_type: '0x3::token::Token',
		key: {
			property_version: '1',
			token_data_id: {
				collection: 'Asset Test',
				creator: '0xe48c100c9186f124d1e32ac0e7dd9ced35127f7d960b8d362d3080cc964e48d1',
				name: 'body',
			},
		},
	});
	console.log(dataAuction);
	return data;
};
// getTokenData('0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900', '2');

// export const getTokenForAccount = async (creator: string, tokenId: any) => {
// 	const client = new AptosClient(APTOS_NODE_URL[2]);
// 	let tokenClient = new TokenClient(client);

// 	return tokenClient
// 		.getTokenForAccount(creator, tokenId)
// 		.then((res) => console.log('token', res));
// };

// getTokenForAccount('0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900', {
// 	property_version: '1',
// 	token_data_id: {
// 		collection: 'Asset Test',
// 		creator: '0xe48c100c9186f124d1e32ac0e7dd9ced35127f7d960b8d362d3080cc964e48d1',
// 		name: 'body',
// 	},
// });

export { getBidAuction, getBidUser, getEventsByCreationNumber };
