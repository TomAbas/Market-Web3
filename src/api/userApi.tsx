import axiosClient from './axiosClient';
import { User, UserLoginModel } from 'models/user';
import { Response } from '../models/common';
const baseURL = '/users';

function updateUser(data: User): Promise<Response<User>> {
	const { userAddress } = data;
	const url = baseURL + `/userAddress/${userAddress}`;
	return axiosClient.put(url, data);
}
function loginUser(data: UserLoginModel) {
	return axiosClient.post('/users/login', data);
}

export { updateUser, loginUser };
