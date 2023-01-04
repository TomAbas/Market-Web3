import {
	startLoadingA,
	hasErrorA,
	getUserSuccessA,
	logOutUserSuccessA,
	getChainIdA,
} from '../slices/userInfo';
import { useAppDispatch, useAppSelector } from '../hooks';

import { selectUser } from '../slices/userInfo';
//modalWallet

export const useUserInfo = () => {
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);
	const userAddress = userInfo?.userAddress;

	const logOutUserSuccess = () => {
		dispatch(logOutUserSuccessA);
	};
	const startLoading = () => dispatch(startLoadingA);
	const hasError = (error: any) => {
		dispatch(hasErrorA(error));
	};

	return { logOutUserSuccess, startLoading, hasError };
};
