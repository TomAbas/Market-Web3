/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from 'redux/hooks';
const useAccountGuard = () => {
	const { wallet } = useWallet();
	let chainId = wallet?.adapter.network.chainId;
};

export default useAccountGuard;
