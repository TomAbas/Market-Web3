import { AptosClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS || '';
const COIN_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';
const getPredictionResource = async (chainId: string = '2', coinType: string = COIN_TYPE) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(
		MARKET_ADDRESS,
		`${MARKET_ADDRESS}::prediction::Prediction<${coinType}>`
	);
	console.log(data);
	let { handle } = data.all_events;
	let dataAuction = await client.getTableItem(handle, {
		key_type: `${MARKET_ADDRESS}::prediction::EventID`,
		value_type: `${MARKET_ADDRESS}::prediction::Event<${coinType}>`,
		key: {
			creator: '0x7ea7456bd8e6bab493761d81136e42c018f90c5a522688a951d86e6b98a0a900',
			description: 'What do you think will happen next year?',
			options: [
				'They probably won’t hear until next week.',
				'I definitely won’t go to the party.',
				'She’ll possibly tell us tomorrow.',
			],
		},
	});
	console.log(data);
	console.log(dataAuction);
	return handle;
};

export { getPredictionResource };
