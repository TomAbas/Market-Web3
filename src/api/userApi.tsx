/* eslint-disable react-hooks/rules-of-hooks */
import axiosClient from './axiosClient';
import { User, UserLoginModel } from 'models/user';
import { Response } from '../models/common';
const baseURL = '/users';
const baseURLINTERACTION = '/interaction';
const baseURLHISTORY = '/history';
function updateUser(data: User): Promise<Response<User>> {
	const { userAddress } = data;
	const url = baseURL + `/userAddress/${userAddress}`;
	return axiosClient.put(url, data);
}
function loginUser(data: UserLoginModel) {
	let info: any = axiosClient.post('/users/login', data);
	info.then((res: any) => {
		if (res.data?.token) {
			localStorage.setItem('token', res.data.token);
			// window.location.reload();
		}
		return res;
	});
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
	const url = baseURL + `/get-top-trader`;
	return axiosClient.get(url).then((res) => res.data);
}
function getListItemF(userAddress: string): Promise<Response<any>> {
	const url = baseURLINTERACTION + `/userAddress/${userAddress}`;
	return axiosClient.get(url).then((res) => res.data);
}
function getUserHistory(userAddress: string): Promise<Response<any>> {
	const url = baseURLHISTORY + `/get-by-user/userAddress/${userAddress}`;
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
	getUserHistory,
};
