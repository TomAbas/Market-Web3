/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react';
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
import { getListItemResource } from 'utils/dataResource';
import ScrollToTop from 'hooks/useScrollToTop';
function App() {
	const [offers, setOffers] = useState<any[]>([]);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			setOffers(newOffers);
		};
		fetchOffers();
	}, []);
	const wallets = useMemo(
		() => [
			new SpacecyWalletAdapter(),
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
							<ScrollToTop>
								<div className="container">
									<Outlet context={[offers, setOffers]} />
								</div>
							</ScrollToTop>
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
