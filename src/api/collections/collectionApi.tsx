import ClientAxios from 'customAxios/ClientAxios';
import { Response } from '../../models/common';

function getAllCollections(chainId: string): Promise<Response<any>> {
	const url = `/collection/get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
function getCategoryCollections(chainId: string, category: string): Promise<Response<any>> {
	const url = `/collection/category/${category}/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}
export { getAllCollections, getCategoryCollections };
