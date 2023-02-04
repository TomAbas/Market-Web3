/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getUserSuccessA } from 'redux/slices/userInfo';
import { loginUser } from '../api/userApi';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { toast } from 'react-toastify';
const useLogin = () => {
	const [loginSuccess, setLoginSuccess] = useState(false);
	const { account, wallet } = useWallet();
	let userAddress = account?.address?.toString();
	const dispatch = useAppDispatch();

	async function login() {
		try {
			localStorage.setItem('wallet', wallet?.adapter.name!);
			let { data } = (await loginUser({ userAddress })).data;
			dispatch(getUserSuccessA(data));
			setLoginSuccess(true);
			toast.success('Successful login');
		} catch (error: any) {
			setLoginSuccess(false);
			// toast.error(error.message);
		}
	}

	useEffect(() => {
		if (userAddress) {
			login();
		}
	}, [userAddress]);

	return { loginSuccess, userAddress };
};

export default useLogin;
