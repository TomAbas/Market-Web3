import { AptosClient, TokenClient } from 'aptos';
import { APTOS_NODE_URL } from '../constants/aptos.constant';
import { COLLECTION_DEFAULT } from 'constants/sellItem';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS || '';
const COIN_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';

const getPredictionResource = async (
	creator: string,
	description: string,
	options: string[],
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
			options: options,
		},
	});
	return dataPredict;
};

const getValueOfPrediction = async (
	creator: string,
	option: string,
	cointType: string = COIN_TYPE,
	chainId: string = '2'
) => {
	const client = new AptosClient(APTOS_NODE_URL[chainId]);
	let tokenClient = new TokenClient(client);
	const tokenId: any = {
		token_data_id: {
			creator: creator,
			collection: COLLECTION_DEFAULT,
			name: option,
		},
		property_version: '0',
	};
	return tokenClient.getTokenForAccount(creator, tokenId).then((res) => {
		return res.amount;
	});
};

export { getPredictionResource, getValueOfPrediction };
