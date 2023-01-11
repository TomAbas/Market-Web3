import axios from 'axios';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
axios.defaults.headers.common.Origin = '*';
export const getListItemResource = async () => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::market::TokenInfo`
		);
		return response.data.data?.token_list.reverse();
	} catch (error) {
		return [];
	}
};

export const getListCollectionUserResource = async (address: any) => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}accounts/${address}/resource/${MARKET_ADDRESS}::nft::CollectionInfo`
		);
		return response.data.data?.collection_list;
	} catch (error) {
		return [];
	}
};

export const getWhiteListDropResource = async () => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::MetaspacecyTicket::WhiteList`
		);
		return response.data.data?.white_list;
	} catch (error) {
		return [];
	}
};

export const getTicketDropResource = async () => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::MetaspacecyTicket::TokenInfo`
		);
		return response.data.data?.token_list;
	} catch (error) {
		return [];
	}
};

export const getListCollectionMarketplace = async (offers: any[]) => {
	try {
		if (!offers) {
			offers = await getListItemResource();
		}
		let newCollection = new Map();
		offers.map((item) => {
			let collection = newCollection.get(
				item?.token_id.token_data_id.collection +
					'*/////*' +
					item?.token_id.token_data_id.creator
			);
			if (!collection) {
				newCollection.set(
					item?.token_id.token_data_id.collection +
						'*/////*' +
						item?.token_id.token_data_id.creator,
					[item]
				);
			} else {
				collection.push(item);
				newCollection.set(
					item?.token_id.token_data_id.collection +
						'*/////*' +
						item?.token_id.token_data_id.creator,
					collection
				);
			}
		});
		return Array.from(newCollection);
	} catch (error) {
		return [];
	}
};
