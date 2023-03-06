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
