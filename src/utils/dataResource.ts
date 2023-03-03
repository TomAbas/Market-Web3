import axios from 'axios';
import { nftItem } from 'models/item';
const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS =
	process.env.REACT_APP_MARKET_RESOURCE_ADDRESS || '0x1::aptos_coin::AptosCoin';

export function getItemFromOrder(listNftOrders: any[], offer: nftItem) {
	let itemOrder = listNftOrders.find((item) => {
		if (
			item.token_id.token_data_id.creator === offer.creator &&
			item.token_id.token_data_id.collection === offer.collectionInfo.collectionName &&
			item.token_id.token_data_id.name === offer.itemName
		) {
			return true;
		}
		return false;
	});
	return itemOrder ? itemOrder : null;
}

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
