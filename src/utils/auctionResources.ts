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
	console.log('dsfjiusdj', dataAuction);
	return dataAuction;
};

// getBidUser(
// 	'0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900',
// 	'0x1::aptos_coin::AptosCoin',
// 	'2',
// 	'0x86eaf7971fb790eb2089d5a5f8ed5b243a32a3ecd49345bc0402d98023a5cb78',
// 	'33'
// );

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

export { getBidAuction, getBidUser, getEventsByCreationNumber };
