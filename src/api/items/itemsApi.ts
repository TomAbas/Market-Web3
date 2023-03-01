import ClientAxios from '../axiosClient';
import { Response } from '../../models/common';

function getAllItems(chainId: string): Promise<Response<any>> {
	const url = `/item/get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getOfferOfItem(itemId: string): Promise<Response<any>> {
	const url = `/item/get-all/chainId/${itemId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getItemDetail(itemId: string): Promise<Response<any>> {
	const url = `/item/get-info/itemId/${itemId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getUserItem(chainId: string, userAddress: string): Promise<Response<any>> {
	const url = `/item/get-item-for-user/userAddress/${userAddress}/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getItemHistory(itemId: string): Promise<Response<any>> {
	const url = `/history/get-by-item/itemId/${itemId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getItemCreate(userAddress: string): Promise<Response<any>> {
	const url = `/item/get-item-by-created/${userAddress}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getItemCollected(userAddress: string): Promise<Response<any>> {
	const url = `/item/get-item-by-collected/${userAddress}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getItemSelected(): Promise<Response<any>> {
	const url = `/item/getItem`;
	return ClientAxios.get(url).then((res) => res.data);
}

function transferItem(data: any): Promise<Response<any>> {
	const url = `/item/transfer`;
	return ClientAxios.put(url, data).then((res) => res.data);
}
function getOrderOfItem(itemId: string): Promise<any[]> {
	const url = `/order/get-order-by-itemId/${itemId}`;
	return ClientAxios.get(url).then((res) => res.data.data);
}
function getAuctionDetail(orderId: string): Promise<any> {
	const url = `/order/get-order-by-id/${orderId}`;
	return ClientAxios.get(url).then((res) => res.data.data);
}

export {
	getAllItems,
	getOfferOfItem,
	getItemDetail,
	getUserItem,
	getItemHistory,
	getItemCreate,
	getItemCollected,
	getItemSelected,
	transferItem,
	getOrderOfItem,
	getAuctionDetail,
};
