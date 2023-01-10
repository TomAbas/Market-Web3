/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import SizeObserver from 'contexts/SizeObserver';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
//components
import AccountGuard from 'components/AccountGuard/AccountGuard';
import ModalGuard from 'components/ModalGuard/ModalGuard';
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
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
						<AccountGuard>
							<div className="container">
								<Outlet />
							</div>
						</AccountGuard>
						<FooterComp />
						<ModalGuard />
						<ToastContainer />
					</SizeObserver>
				</WalletProvider>
			</Provider>
		</>
	);
}

export default App;
