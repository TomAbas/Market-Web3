import { AptosClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS || '';
const COIN_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';
const getPredictionResource = async (
	creator: string,
	description: string,
	option: string[],
	chainId: string = '2',
	coinType: string = COIN_TYPE
) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let { data }: any = await client.getAccountResource(
		MARKET_ADDRESS,
		`${MARKET_ADDRESS}::prediction::Prediction<${coinType}>`
	);
	let { handle } = data.all_events;
	await new Promise((resolve) => setTimeout(resolve, 500));
	let dataPredict = await client.getTableItem(handle, {
		key_type: `${MARKET_ADDRESS}::prediction::EventID`,
		value_type: `${MARKET_ADDRESS}::prediction::Event<${coinType}>`,
		key: {
			creator: creator,
			description: description + ':?:' + coinType,
			options: option,
		},
	});
	return dataPredict;
};

export { getPredictionResource };
