import ClientAxios from './axiosClient';
import { Response } from '../models/common';

function getAllCollections(chainId: string): Promise<Response<any>> {
	const url = `/collection/get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getCategoryCollections(chainId: string, category: string): Promise<Response<any>> {
	const url = `/collection/category/${category}/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}

function getTopCollections(
	chainId: string,
	pageSize: string,
	pageNumber: string,
	sortBy: string
): Promise<Response<any>> {
	const url = `/collection/top/chainId/${chainId}/pageSize/${pageSize}/page/${pageNumber}`;
	const filter = { sortBy: sortBy, sortFrom: 'desc' };
	return ClientAxios.post(url, filter).then(({ data }) => data);
}
function getItemOfCollection(collectionId: string) {
	const url = `/collection/get-info/collectionId/${collectionId}`;
	return ClientAxios.get(url).then(({ data }) => data);
}
export { getAllCollections, getCategoryCollections, getTopCollections, getItemOfCollection };
