/* eslint-disable @typescript-eslint/no-unused-vars */
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
import React, { useEffect, useState, useMemo } from 'react';
//web3 provider

import SizeObserver from 'contexts/SizeObserver';

import {
	FewchaWalletAdapter,
	PontemWalletAdapter,
	MartianWalletAdapter,
	WalletProvider,
	AptosWalletAdapter,
	SpacecyWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';
import { Outlet } from 'react-router-dom';

function App() {
	const wallets = useMemo(
		() => [
			new AptosWalletAdapter(),
			new MartianWalletAdapter(),
			new PontemWalletAdapter(),
			new FewchaWalletAdapter(),
			new SpacecyWalletAdapter(),
		],
		[]
	);
	return (
		<>
			<WalletProvider wallets={wallets} autoConnect={true}>
				<SizeObserver>
					<Header />
					<Outlet />
					<FooterComp />
				</SizeObserver>
			</WalletProvider>
		</>
	);
}

export default App;
