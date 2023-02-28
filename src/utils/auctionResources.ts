import { AptosClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS =
	process.env.REACT_APP_MARKET_ADDRESS ||
	'0x5501332ea130b2bc65a0f2531d62c26cb2c7086f856632a6a579e99ed0f186c5';

const chainId = '2';

const getBidAuction = async (auctionId: string) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(
		MARKET_ADDRESS,
		`0x5501332ea130b2bc65a0f2531d62c26cb2c7086f856632a6a579e99ed0f186c5::auction::Auctions<0x1::aptos_coin::AptosCoin>`
	);
	let handle = data.all_active_auctions.handle;
	console.log(handle);

	let hfdsj = await client.getTableItem(handle, {
		key_type: 'u64',
		value_type:
			'0x5501332ea130b2bc65a0f2531d62c26cb2c7086f856632a6a579e99ed0f186c5::auction::Auction<0x1::aptos_coin::AptosCoin>',
		key: '1',
	});
	console.log(hfdsj);
};
getBidAuction('3');
export { getBidAuction };
