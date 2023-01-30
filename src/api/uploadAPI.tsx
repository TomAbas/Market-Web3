import axiosClient from './axiosClient';
import { Response } from '../models/common';

function uploadUserMedia(data: FormData, userAddress: string): Promise<Response<any>> {
	const url = `/users/upload`;
	const header: any = { headers: { 'content-type': 'multipart/form-data' } };
	return axiosClient.post(url, data, header);
}

export { uploadUserMedia };
