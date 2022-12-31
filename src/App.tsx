/* eslint-disable @typescript-eslint/no-unused-vars */
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
import React, { useEffect, useState, useMemo } from 'react';
//web3 provider
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import SizeObserver from 'contexts/SizeObserver';
import Marketplace from 'components/Marketplace';
import MintTabs from './components/Mint/mint';

import {
	FewchaWalletAdapter,
	PontemWalletAdapter,
	MartianWalletAdapter,
	WalletProvider,
	AptosWalletAdapter,
	SpacecyWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';

function App() {
	const [statePage, setStatePage] = useState(1);

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
					<Header setStatePage={setStatePage} />
					{statePage === 1 || statePage == 2 ? (
						<div className="container">
							<Marketplace />
						</div>
					) : (
						<></>
					)}

					<FooterComp />
				</SizeObserver>
			</WalletProvider>
		</>
	);
}

export default App;
