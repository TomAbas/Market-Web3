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
//redux
import { store } from './redux/store';
import { Provider } from 'react-redux';
function App() {
	const wallets = useMemo(
		() => [
			new AptosWalletAdapter(),
			new MartianWalletAdapter(),
			new PontemWalletAdapter(),
			// new FewchaWalletAdapter(),
			// new SpacecyWalletAdapter(),
		],
		[]
	);
	return (
		<>
			<Provider store={store}>
				<WalletProvider wallets={wallets} autoConnect={true}>
					<SizeObserver>
						<Header />
						<div className="container">
							<Outlet />
						</div>
						<FooterComp />
					</SizeObserver>
				</WalletProvider>
			</Provider>
		</>
	);
}

export default App;
