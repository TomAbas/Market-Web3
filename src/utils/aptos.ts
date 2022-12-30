import { WalletClient } from '@martiandao/aptos-web3-bip44.js';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const APTOS_FAUCET_URL = process.env.REACT_APP_APTOS_FAUCET_URL;

const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

export function createCollectionPayload(name: string, description: string, uri: string) {
	return {
		type: 'entry_function_payload',
		function: `${MARKET_ADDRESS}::nft::create_collection`,
		type_arguments: [MARKET_COINT_TYPE],
		arguments: [name, description, uri],
	};
}

export function createTokenPayload(
	collection: string,
	name: string,
	description: string,
	uri: string,
	payeeAddress: string,
	amount: number,
	royaltyFee: number
) {
	const royaltyFeeNumerator = royaltyFee * 100;
	const royaltyFeeDenominator = 10000;
	return {
		type: 'entry_function_payload',
		function: `${MARKET_ADDRESS}::nft::mint_nft`,
		type_arguments: [MARKET_COINT_TYPE],
		arguments: [
			name,
			description,
			uri,
			collection,
			amount,
			payeeAddress,
			royaltyFeeNumerator,
			royaltyFeeDenominator,
		],
	};
}

export const walletClient = new WalletClient(APTOS_NODE_URL, APTOS_FAUCET_URL);
