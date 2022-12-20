import {
	startLoadingA,
	hasErrorA,
	getUserSuccessA,
	logOutUserSuccessA,
	getChainIdA,
} from '../slices/userInfo';
import { useAppDispatch, useAppSelector } from '../hooks';
import Web3 from 'web3';
import { formatNumber } from 'utils/formatNumber';
import { ethers, BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import SwitchNetwork from '../../hooks/switchNetwork';
import { testnetBinance } from '../../constants';
import { getWeb3Contract } from '../../hooks/useWeb3Contract';
import presentsContract from '../../abi/presentsContract.json';
import { CONTRACT } from '../../constants/address.constant';
import { selectUser, selectWeb3 } from '../slices/userInfo';
//modalWallet
import { openSecondModal } from '../slices/modalWallet';
import { useEffect } from 'react';
export const useUserInfo = () => {
	const context = useWeb3React<Web3Provider>();
	let { activate } = context;
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);
	const userAddress = userInfo?.userAddress;
	const web3Info = useAppSelector(selectWeb3);
	const chainId = web3Info?.chainId;
	let web3 = new Web3(Web3.givenProvider);
	const presentsContractFuncs = getWeb3Contract(
		presentsContract.abi,
		CONTRACT[chainId].presentsContract
	);
	const logOutUserSuccess = () => {
		dispatch(logOutUserSuccessA);
	};
	const startLoading = () => dispatch(startLoadingA);
	const hasError = (error: any) => {
		dispatch(hasErrorA(error));
	};
	const getCurrentChainId = async () => {
		let chainId = (await web3.eth.net.getId()).toString();
		if (chainId === '97') {
			dispatch(getChainIdA({ chainId }));
		} else {
			console.log('123');
			await SwitchNetwork(testnetBinance, 97)
				.then((res) => {
					console.log(res);
					dispatch(getChainIdA({ chainId: '97' }));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	const getUserAddress = async () => {
		let address = await web3.eth.getAccounts();
		let addressUser = address[0];
		let userInfo = { userAddress: addressUser };
		// usePost(`${API_ENDPOINT}/users/login`, userInfo);
		dispatch(getUserSuccessA(userInfo));
		getUserBalance(addressUser);
	};
	// const formatNumber = (
	// 	amount: string,
	// 	minNumberLimitAfterComma: number,
	// 	maxNumberLimitAfterComma: number
	// ) => {
	// 	if (maxNumberLimitAfterComma) {
	// 		return numeral(amount).format(
	// 			`0,0.${'0'.repeat(minNumberLimitAfterComma)}[${'0'.repeat(
	// 				maxNumberLimitAfterComma - minNumberLimitAfterComma
	// 			)}]`
	// 		);
	// 	} else {
	// 		return numeral(amount).format(`0,0.${'0'.repeat(minNumberLimitAfterComma)}`);
	// 	}
	// };
	const getUserBalance = async (address: string) => {
		let balanceOfUser;
		if (address) {
			try {
				let balance = await web3.eth.getBalance(address);
				const value = BigNumber.from(balance);
				const token = ethers.utils.formatEther(value);
				balanceOfUser = token.toString();
				let formatValue = formatNumber(balanceOfUser, 0, 3);
				let userInfo = { userAddress: address, balance: formatValue };
				dispatch(getUserSuccessA(userInfo));
				console.log('format ' + formatValue);
				console.log('balanceOfUser ' + balanceOfUser);
			} catch (error: any) {
				console.log(error.message);
			}
		}

		return balanceOfUser;
	};
	const connectWalletFunc = async (connector: any) => {
		startLoading();
		try {
			await activate(connector);
			await getUserAddress();
			await getCurrentChainId();
			dispatch(openSecondModal());
		} catch (error) {
			console.log(error);
			hasError(error);
		}
	};
	// let test: any = {
	// 	'1': '5',
	// 	'2': '8',
	// 	'3': '10',
	// };
	const claimPresents = async () => {
		if (userAddress && chainId) {
			try {
				await presentsContractFuncs.methods
					.getGift()
					.send({ from: userAddress, value: 0 })
					.then((res: any) => {
						console.log(res);
						// let type = res.events.GetGift.returnValues.classId === '2' ? '0' : '1';
						// let data = {
						// 	userAddress,
						// 	chainId,
						// 	txhash: res.events.GetGift.transactionHash,
						// 	type: type,
						// 	symbol: 'tien do',
						// 	quantity:
						// 		type === '1'
						// 			? res.events.GetGift.returnValues.giftId
						// 			: test[res.events.GetGift.returnValues.giftId],
						// };

						// usePost(`${API_ENDPOINT}/histories/create`, data);
					});
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		console.log('chay trong hooks');
		getUserAddress();
	}, []);
	return {
		logOutUserSuccess,
		connectWalletFunc,
		getUserAddress,
		getCurrentChainId,
		claimPresents,
		getUserBalance,
	};
};
