import ClientAxios from 'customAxios/ClientAxios';
import { Response } from '../models/common';

function uploadUserMedia(data: FormData, userAddress: string): Promise<Response<any>> {
	const url = `/users/upload`;
	return ClientAxios.post(url, data);
}

export { uploadUserMedia };
