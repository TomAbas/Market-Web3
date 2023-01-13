import axiosClient from './axiosClient';
import { Response } from '../models/common';

function uploadUserMedia(data: FormData, userAddress: string): Promise<Response<any>> {
	const url = `/users/upload`;
	return axiosClient.post(url, data);
}

export { uploadUserMedia };
