import ClientAxios from 'customAxios/ClientAxios';
import { User } from 'models/user';
import { Response } from '../../models/common';
const baseURL = '/users';

function updateUser(data: User): Promise<Response<User>> {
	const { userAddress } = data;
	const url = baseURL + `/userAddress/${userAddress}`;
	return ClientAxios.put(url, data);
}

export { updateUser };
