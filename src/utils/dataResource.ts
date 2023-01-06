import axios from 'axios';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;

export const getListItemResource = async () => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}/accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::market::TokenInfo`
		);
		return response.data.data?.token_list.reverse();
	} catch (error) {
		return [];
	}
};

export const getListCollectionResource = async (address: any) => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}/accounts/${address}/resource/${MARKET_ADDRESS}::nft::CollectionInfo`
		);
		return response.data.data?.collection_list;
	} catch (error) {
		return [];
	}
};
