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
export { getAllItems, getOfferOfItem, getItemDetail };
