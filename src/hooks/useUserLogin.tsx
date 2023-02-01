import ClientAxios from 'api/axiosClient';
import { UserLoginModel } from 'models/user';

const loginUser = (data: UserLoginModel) => {
	ClientAxios.post('/users/login', data);
};

export { loginUser };
