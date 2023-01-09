import ClientAxios from 'customAxios/ClientAxios';
import { UserLoginModel } from 'models/user';

const loginUser = (data: UserLoginModel) => {
	ClientAxios.post('/users/login', data);
};

export { loginUser };
