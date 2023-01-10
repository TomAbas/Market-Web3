import { useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getUserSuccessA } from 'redux/slices/userInfo';
import { loginUser } from '../api/userApi/userApi';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
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
		} catch (error) {}
	}
	useEffect(() => {
		if (userAddress) {
			login();
		}
	}, [userAddress]);
	return { loginSuccess, userAddress };
};

export default useLogin;
