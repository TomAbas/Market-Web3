import ClientAxios from 'customAxios/ClientAxios';
import { Response } from '../../models/common';
import { Collection } from '../../models/collection';

async function createCollection(collectionInfo: Collection): Promise<Response<any>> {
	// let urlData = await uploadUserMedia(data, userAddress);
	const url = `/collection/create/userAddress/${collectionInfo.userAddress}/chainId/${collectionInfo.chainId}`;
	const body = {
		logo: collectionInfo.uri,
		collectionName: collectionInfo.collectionName,
	};
	return ClientAxios.post(url, body);
}

export { createCollection };
