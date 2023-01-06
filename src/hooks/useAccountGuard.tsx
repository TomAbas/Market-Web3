/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from 'redux/hooks';
import { letGuard, stopGuard } from 'redux/slices/modalGuard';
const useAccountGuard = () => {
	const dispatch = useAppDispatch();
	const { wallet } = useWallet();
	let api = wallet?.adapter.network.api;

	async function checkAccount() {
		if (wallet) {
			if (api !== process.env.REACT_APP_APTOS_NODE_URL) {
				dispatch(letGuard());
			} else {
				dispatch(stopGuard());
			}
		}
	}

	useEffect(() => {
		checkAccount();
	}, [api]);
};

export default useAccountGuard;
