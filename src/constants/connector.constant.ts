import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { BscConnector } from '@binance-chain/bsc-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
//imgs

import ImageMetamask from '../assets/wallet/metamask.svg';
import ImageCoinbase from '../assets/wallet/coinbase.svg';
import ImageWalletConnect from '../assets/wallet/wallet-connect.svg';

export const RPC_URLS: { [chainId: number]: string } = {
	//ETHEREUM
	1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
	5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
	//BINANCE
	56: 'https://bsc-dataseed.binance.org/',
	97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

export const injected = new InjectedConnector({
	supportedChainIds: [1, 4, 5, 137, 80001, 43113, 43114, 56, 97],
});

export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
		5: RPC_URLS[5],
		56: RPC_URLS[56],
		97: RPC_URLS[97],
	},
	qrcode: true,
});

export const binance = new BscConnector({
	supportedChainIds: [1, 56, 137],
});
//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1],
	appName: 'demo-app',
	supportedChainIds: [1, 4],
});

enum ConnectorNames {
	Injected = 'Injected',
	Binance = 'Binance',
	WalletConnect = 'WalletConnect',
	Coinbase = 'Coinbase',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Binance]: binance,
	[ConnectorNames.WalletConnect]: walletconnect,
	[ConnectorNames.Coinbase]: walletlink,
};

export const listWalletAvailable = [
	{
		name: 'Metamask',
		image: ImageMetamask,
		connector: connectorsByName.Injected,
	},
	{
		name: 'Coinbase',
		image: ImageCoinbase,
		connector: connectorsByName.Coinbase,
	},
	{
		name: 'WalletConnect',
		image: ImageWalletConnect,
		connector: connectorsByName.WalletConnect,
	},
];
