/* eslint-disable @typescript-eslint/no-unused-vars */
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
//web3 provider
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import SizeObserver from 'contexts/SizeObserver';
import Marketplace from 'components/Marketplace';
function App() {
	const getLibrary = (provider: any): Web3Provider => {
		const library = new Web3Provider(provider);
		library.pollingInterval = 12000;
		return library;
	};
	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<SizeObserver>
					<Header />
					<div className="container">
						<Marketplace />
					</div>

					<FooterComp />
				</SizeObserver>
			</Web3ReactProvider>
		</>
	);
}

export default App;
