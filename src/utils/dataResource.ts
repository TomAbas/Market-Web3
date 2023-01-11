import axios from 'axios';
import { getListItemWallet } from './getUser';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS =
	process.env.REACT_APP_MARKET_RESOURCE_ADDRESS || '0x1::aptos_coin::AptosCoin';

// axios.defaults.headers.common.Origin = '*';

export const getListItemResource = async () => {
	try {
		const response: any = await axios.get(
			`${APTOS_NODE_URL}accounts/${MARKET_RESOURCE_ADDRESS}/resource/${MARKET_ADDRESS}::market::TokenInfo`
		);
		const itemsResource = await getListItemWallet(MARKET_RESOURCE_ADDRESS);
		const mapItems = new Map();
		itemsResource.map((item: any) => {
			if (item.collection !== 'Metaspacecy ticket' && item.creator !== MARKET_ADDRESS)
				mapItems.set(`${item.collection}&${item.name}&${item.creator}`, [
					item.description,
					item.supply,
				]);
		});
		// console.log(mapItems);
		const newListItem = response.data.data?.token_list.reverse();
		newListItem.map((item: any, index: any, newListItem: any) => {
			const foundItem = mapItems.get(
				`${item.token_id.token_data_id.collection}&${item.token_id.token_data_id.name}&${item.token_id.token_data_id.creator}`
			);
			if (foundItem) {
				newListItem[index].description = foundItem[0];
				newListItem[index].supply = foundItem[1];
			}
		});
		console.log(newListItem);
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
