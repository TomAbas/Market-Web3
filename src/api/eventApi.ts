import ClientAxios from './axiosClient';
import { Response } from '../models/common';
const baseURL = '/users/';

const createEvent = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}create`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};
const getAllEvent = async (chainId: string = '2') => {
	const url = `${baseURL}get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then(({ data }) => data);
};
export { createEvent, getAllEvent };
