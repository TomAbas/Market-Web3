/* eslint-disable @typescript-eslint/no-unused-vars */
import { AptosClient, TokenClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS || '';
type TableItemRequest = {
	key_type: string;
	value_type: string;
	/**
	 * The value of the table item's key
	 */
	key: any;
};
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

const getEventsByEvent = async (address: string, coinType: string, chainId: string) => {
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

const checkIsClaim = async (
	address: string,
	coinType: string,
	chainId: string,
	lister: string,
	creation_number: string
) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let isClaim = true;
	let result: any = await client
		.getEventsByEventHandle(
			address,
			`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`,
			'withdraw_bid_event'
		)
		.then((res: any) => {
			return res.map((item: any) => item.data.bid_id.listing_id);
		})
		.then((res) => {
			// console.log('fefd', res, creation_number);
			let withdraw = res.find(
				(item: any) =>
					item.addr === lister && item.creation_num === creation_number.toString()
			);
			// console.log('withdraw', withdraw);
			if (withdraw) isClaim = false;
		});
	let result2: any = await client
		.getEventsByEventHandle(
			address,
			`${MARKET_ADDRESS}::bid_utils::BidStore<${coinType}>`,
			'order_executed_event'
		)
		.then((res: any) => {
			// console.log('order_executed_event', res);
			return res.map((item: any) => item.data.bid_id.listing_id);
		})
		.then((res) => {
			let executed = res.find(
				(item: any) => item.addr === lister && item.creation_num === creation_number
			);
			if (executed) isClaim = false;
			// console.log(res);
		});
	return isClaim;
};

// checkIsClaim(
// 	'0xdbbf493e61b815872a08ad520c248b289224bad01a4815453b9ada2f3e2d7c6a',
// 	'0x1::aptos_coin::AptosCoin',
// 	'2',
// 	'0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900',
// 	'128'
// );

export { getBidAuction, getEventsByEvent, checkIsClaim };
