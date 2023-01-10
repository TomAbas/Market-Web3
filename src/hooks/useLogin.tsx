import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getUserSuccessA } from 'redux/slices/userInfo';
import { loginUser } from '../api/userApi/userApi';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { toast } from 'react-toastify';
const useLogin = () => {
	const [loginSuccess, setLoginSuccess] = useState(false);
	const { account } = useWallet();
	let userAddress = account?.address?.toString();

	const dispatch = useAppDispatch();
	async function login() {
		try {
			let { data } = (await loginUser({ userAddress })).data;
			console.log(data);
			dispatch(getUserSuccessA(data));
			setLoginSuccess(true);
			toast.success('Login Success');
		} catch (error: any) {
			toast.error(error.message);
		}
	}
	useEffect(() => {
		if (userAddress) {
			login();
		}
	}, [userAddress]);
	useEffect(() => {
		console.log(loginSuccess);
	}, [loginSuccess]);
	return { loginSuccess, userAddress };
};

export default useLogin;
