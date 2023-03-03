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
import ScrollToTop from 'hooks/useScrollToTop';
//context
import AudioProvider from './contexts/AudioContext';
import { getAllItems } from 'api/items/itemsApi';
import useGetNftOrder from 'hooks/useGetNftOrder';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNfts, selectTrigger } from 'redux/slices/nftFilter';
import AccountSign from 'components/AccountSign/AccountSign';
function App() {
	const [loadingOffers, setLoadingOffers] = useState(true);
	const [trigger, setTrigger] = useState(false);
	const [offers, setOffers] = useState<any[]>([]);
	const { getListNFTOrders } = useGetNftOrder();
	const triggerFetchNft = useAppSelector(selectTrigger);
	const dispatch = useAppDispatch();
	useEffect(() => {
		getListNFTOrders();
	}, []);
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers: any[] = await getAllItems('2').then((res) => {
				dispatch(getAllNfts(res.data));
				return res.data.slice(0, 12);
			});
			setOffers(newOffers);
			setLoadingOffers(false);
		};
		fetchOffers();
	}, [triggerFetchNft, dispatch]);
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
							<AccountSign>
								<Header />
								<AccountGuard>
									<ScrollToTop>
										<div className="container">
											<Outlet
												context={[
													offers,
													setOffers,
													loadingOffers,
													setTrigger,
												]}
											/>
										</div>
									</ScrollToTop>
								</AccountGuard>
							</AccountSign>
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
