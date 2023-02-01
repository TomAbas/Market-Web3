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
	return axiosClient.post('/users/login', data);
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
export { updateUser, loginUser, getUserInfo, getLikesStatusOfItem, putLikesToItem };
