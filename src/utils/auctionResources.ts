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

const getBidUser = async (
	address: string,
	coinType: string,
	chainId: string,
	lister: string,
	creation_number: string
) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(
		address,
		`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`
	);
	let handle = data.store.handle;
	console.log('handle', handle);
	let dataAuction = await client.getTableItem(handle, {
		key_type: `${MARKET_ADDRESS}::bid_utils::BidId`,
		value_type: `${MARKET_ADDRESS}::bid_utils::Bid<${coinType}>`,
		key: {
			bidder: address,
			listing_id: {
				addr: lister,
				creation_number: creation_number,
			},
		},
	});
	return dataAuction;
};

getBidUser(
	'0xed08f5856d2e5a1ab7282964922b7ec8c18b85c911d99b3f23eb25af5965d270',
	'0x5501332ea130b2bc65a0f2531d62c26cb2c7086f856632a6a579e99ed0f186c5::metaspacecy_coin_test::DaiCoin',
	'2',
	'0x98d807bee3b8a28feb99c87712787ad1608c5e31cd6770669e39dcb8a3ae6b0d',
	'33'
);

const getEventsByCreationNumber = async (address: string, coinType: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let data: any = await client
		.getEventsByEventHandle(
			address,
			`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`,
			'bid_event'
		)
		.then((res: any) => res);
	console.log(data);
	return data;
};

const getTokenData = async (address: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(MARKET_ADDRESS, `0x3::token::TokenStore`);
	let handle = data.tokens.handle;
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
