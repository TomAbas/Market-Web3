import { Collection, Item, Order } from '../models/collection';
import axiosClient from './axiosClient';
import { Response } from '../models/common';

async function createCollection(collectionInfo: Collection): Promise<Response<any>> {
	// let urlData = await uploadUserMedia(data, userAddress);
	const url = `/collection/create/userAddress/${collectionInfo.userAddress}/chainId/${collectionInfo.chainId}`;
	return axiosClient.post(url, collectionInfo);
}

async function getCollectionByUserAddress(userAddress: string, chainId: number = 2) {
	const url = `/collection/userAddress/${userAddress}/chainId/${chainId}`;
	return axiosClient.get(url).then((res) => res.data);
}

async function createItem(itemInfo: Item): Promise<Response<any>> {
	const url = `/item/create/userAddress/${itemInfo.creator}/chainId/${itemInfo.chainId}`;
	return axiosClient.post(url, itemInfo);
}

async function sellItem(listItemInfo: Order) {
	const url = `order/sell-item/userAddress/${listItemInfo.maker}/chainId/${listItemInfo.chainId}`;
	return axiosClient.post(url, listItemInfo);
}

async function buyItem(listItemInfo: Order) {
	const url = `order/buy-item/userAddress/${listItemInfo.maker}/chainId/${listItemInfo.chainId}`;
	return axiosClient.post(url, listItemInfo);
}

async function cancelOrder(listItemInfo: Order) {
	const url = `order/cancel-order/userAddress/${listItemInfo.maker}/chainId/${listItemInfo.chainId}`;
	return axiosClient.post(url, listItemInfo);
}

export { createCollection, getCollectionByUserAddress, createItem, sellItem, buyItem, cancelOrder };
