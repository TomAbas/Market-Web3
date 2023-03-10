import ClientAxios from './axiosClient';
import { Response } from '../models/common';
const baseURL = '/event/';

const createEvent = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}create`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};
const getAllEvent = async (chainId: string = '2') => {
	const url = `${baseURL}get-all/chainId/${chainId}`;
	return ClientAxios.get(url).then(({ data }) => data);
};

const getEventById = async (id: string) => {
	const url = `${baseURL}get-by-id/eventId/${id}`;
	return ClientAxios.get(url).then(({ data }) => data);
};

const predictEventApi = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}predict`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};

const cancelEventApi = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}cancel`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};

const finalizeEventApi = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}finalize`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};

const redeemEventApi = async (data: any): Promise<Response<any>> => {
	const url = `${baseURL}redeem`;
	return ClientAxios.post(url, data).then(({ data }) => data);
};
export {
	createEvent,
	getAllEvent,
	getEventById,
	predictEventApi,
	cancelEventApi,
	finalizeEventApi,
	redeemEventApi,
};
