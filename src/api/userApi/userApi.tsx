import ClientAxios from 'customAxios/ClientAxios';
import { User, UserLoginModel } from 'models/user';
import { Response } from '../../models/common';
const baseURL = '/users';

function updateUser(data: User): Promise<Response<User>> {
	const { userAddress } = data;
	const url = baseURL + `/userAddress/${userAddress}`;
	return ClientAxios.put(url, data);
}
function loginUser(data: UserLoginModel) {
	return ClientAxios.post('/users/login', data);
}

export { updateUser, loginUser };
