/* eslint-disable react-hooks/rules-of-hooks */
import axiosClient from './axiosClient';
import { User, UserLoginModel } from 'models/user';
import { Response } from '../models/common';
const baseURL = '/users';
const baseURLINTERACTION = '/interaction';

function updateUser(data: User): Promise<Response<User>> {
	const { userAddress } = data;
	const url = baseURL + `/userAddress/${userAddress}`;
	return axiosClient.put(url, data);
}
function loginUser(data: UserLoginModel) {
	let info: any = axiosClient.post('/users/login', data);
	return info;
}

function getUserInfo(userAddress: string) {
	const url = baseURL + `/userAddress/${userAddress}`;
	return axiosClient.get(url);
}
function getLikesStatusOfItem(userAddress: string): Promise<Response<any>> {
	const url = baseURLINTERACTION + `/userAddress/${userAddress}`;
	return axiosClient.get(url);
}
function putLikesToItem(
	userAddress: string,
	itemId: string,
	state: boolean = true
): Promise<Response<any>> {
	const url = baseURLINTERACTION + `/create/userAddress/${userAddress}`;
	return axiosClient.post(url, { itemId, state });
}
function getTopTradeUsers(chainId: string, numberDay: string): Promise<Response<any>> {
	const url = baseURL + `/top-trader/chainId/${chainId}/?request=${numberDay}`;
	return axiosClient.get(url).then((res) => res.data);
}
function getListItemF(userAddress: string): Promise<Response<any>> {
	const url = baseURLINTERACTION + `/userAddress/${userAddress}`;
	return axiosClient.get(url).then((res) => res.data);
}
export {
	updateUser,
	loginUser,
	getUserInfo,
	getLikesStatusOfItem,
	putLikesToItem,
	getTopTradeUsers,
	getListItemF,
};
