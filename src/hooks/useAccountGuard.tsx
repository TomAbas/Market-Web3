/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from 'redux/hooks';
import { letGuard, stopGuard } from 'redux/slices/modalGuard';
const useAccountGuard = () => {
	const dispatch = useAppDispatch();
	const { wallet } = useWallet();
	let chainId = wallet?.adapter.network.chainId;
	// async function checkAccount() {
	// 	if (wallet) {
	// 		if (chainId?.toString() !== '2') {
	// 			dispatch(letGuard());
	// 		} else {
	// 			dispatch(stopGuard());
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	checkAccount();
	// }, [chainId]);
};

export default useAccountGuard;
