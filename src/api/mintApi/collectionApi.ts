import ClientAxios from 'customAxios/ClientAxios';
import { Response } from '../../models/common';
import { Collection, Item } from '../../models/collection';

async function createCollection(collectionInfo: Collection): Promise<Response<any>> {
	// let urlData = await uploadUserMedia(data, userAddress);
	const url = `/collection/create/userAddress/${collectionInfo.userAddress}/chainId/${collectionInfo.chainId}`;
	return ClientAxios.post(url, collectionInfo);
}

async function getCollectionByUserAddress(userAddress: string, chainId: number = 2) {
	const url = `/collection/userAddress/${userAddress}/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}

async function createItem(itemInfo: Item): Promise<Response<any>> {
	const url = `/item/create/userAddress/${itemInfo.creator}/chainId/${itemInfo.chainId}`;
	console.log(itemInfo);
	return ClientAxios.post(url, itemInfo);
}

export { createCollection, getCollectionByUserAddress, createItem };
