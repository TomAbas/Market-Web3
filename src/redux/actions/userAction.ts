import { startLoadingA, hasErrorA, logOutUserSuccessA } from '../slices/userInfo';
import { useAppDispatch } from '../hooks';

//modalWallet

export const useUserInfo = () => {
	const dispatch = useAppDispatch();
	const logOutUserSuccess = () => {
		dispatch(logOutUserSuccessA);
	};
	const startLoading = () => dispatch(startLoadingA);
	const hasError = (error: any) => {
		dispatch(hasErrorA(error));
	};

	return { logOutUserSuccess, startLoading, hasError };
};
