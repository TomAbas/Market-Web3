import ClientAxios from 'customAxios/ClientAxios';
import { Response } from '../../models/common';

function getAllItems(chainId: string): Promise<Response<any>> {
	const url = `/item/get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then((res) => res.data);
}

export { getAllItems };
