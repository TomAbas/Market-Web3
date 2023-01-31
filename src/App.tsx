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
//context
import AudioProvider from './contexts/AudioContext';
import { getAllItems } from 'api/items/itemsApi';
import useGetNftOrder from 'hooks/useGetNftOrder';
function App() {
	const [loadingOffers, setLoadingOffers] = useState(true);
	const [trigger, setTrigger] = useState(false);
	const [offers, setOffers] = useState<any[]>([]);
	const { getListNFTOrders } = useGetNftOrder();
	useEffect(() => {
		getListNFTOrders();
	}, []);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers: any[] = await getAllItems('2').then((res) => res.data.slice(0, 12));
			setOffers(newOffers);
			setLoadingOffers(false);
		};
		fetchOffers();
	}, [trigger]);
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
					<AudioProvider>
						<SizeObserver>
							<Header />
							<AccountGuard>
								<ScrollToTop>
									<div className="container">
										<Outlet
											context={[offers, setOffers, loadingOffers, setTrigger]}
										/>
									</div>
								</ScrollToTop>
							</AccountGuard>
							<FooterComp />
							<ModalGuard />
							<ToastContainer />
						</SizeObserver>
					</AudioProvider>
				</WalletProvider>
			</Provider>
		</>
	);
}

export default App;
