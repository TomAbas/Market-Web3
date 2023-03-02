import { AptosClient } from 'aptos';
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
	console.log(dataAuction);
	return dataAuction;
};

const getBidUser = async (address: string, coinType: string, chainId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let data: any = await client.getAccountResource(
		address,
		`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`
	);
	// let handle = data.store.handle;
	console.log(data);
	// let dataAuction = await client.getTableItem(handle, {
	// 	key_type: 'u64',
	// 	value_type: `${MARKET_ADDRESS}::auction::Auction<${coinType}>`,
	// 	key: auctionId,
	// });
	// console.log(dataAuction);
	// return dataAuction;
};

getBidUser(
	'0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900',
	'0x1::aptos_coin::AptosCoin',
	'2'
);

const getEventsByCreationNumber = async (
	address: string,
	crestionNumber: string,
	coinType: string
) => {
	const client = new AptosClient(APTOS_NODE_URL[2]);
	let data: any = await client.getEventsByEventHandle(
		address,
		`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`,
		'bid_event'
	);
	console.log(data);
};

export { getBidAuction, getBidUser, getEventsByCreationNumber };
