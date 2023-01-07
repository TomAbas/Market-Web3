/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from 'redux/hooks';
import { letGuard, stopGuard } from 'redux/slices/modalGuard';
const useAccountGuard = () => {
	const dispatch = useAppDispatch();
	const { wallet } = useWallet();
	let network = wallet?.adapter.network.name;
	console.log(wallet?.adapter.network);
	async function checkAccount() {
		if (wallet) {
			if (network?.toString() !== 'Testnet') {
				dispatch(letGuard());
			} else {
				dispatch(stopGuard());
			}
		}
	}

	useEffect(() => {
		checkAccount();
	}, [network]);
};

export default useAccountGuard;
