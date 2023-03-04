/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	AptosClient,
	AptosAccount,
	FaucetClient,
	TokenClient,
	CoinClient,
	getAddressFromAccountOrAddress,
} from 'aptos';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { APTOS_NODE_URL, APTOS_FAUCET_URL } from 'constants/aptos.constant';
import { ListTokenPaymentTestNet } from 'constants/sellItem';
const REACT_APP_MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const chainId = '2';
const COIN_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';

function useTransfer() {
	const { signAndSubmitTransaction } = useWallet();
	async function checkEnableReceivingNFT(address: string): Promise<boolean> {
		try {
			const NODE_URL = APTOS_NODE_URL[chainId];
			const client = new AptosClient(NODE_URL);
			let res = await client
				.getAccountResource(address, '0x3::token::TokenStore')
				.then((res: any) => res.data);
			return res.direct_transfer;
		} catch (error) {
			return false;
		}
	}
	async function enableReceivingNFT(to: string, coinType = COIN_TYPE) {
		const extraArgs = {
			coinType: coinType,
			createReceiverIfMissing: true,
		};
		const func = '0x3::token::opt_in_direct_transfer';
		const typeArgs: any[] = [];
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: typeArgs,
			arguments: [true],
		};
		return signAndSubmitTransaction(payload);
	}
	async function directTransferToken(
		receiver: any,
		creator: string,
		collectionName: string,
		itemName: string,
		amount: number
	) {
		const args = [creator, collectionName, itemName, 0, receiver, amount];
		const func = '0x3::token::transfer_with_opt_in';
		const typeArgs: any[] = [];
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: typeArgs,
			arguments: args,
		};
		return signAndSubmitTransaction(payload);
	}
	async function checkCoinStore(address: string, coinType: string): Promise<boolean> {
		try {
			const NODE_URL = APTOS_NODE_URL[chainId];
			const client = new AptosClient(NODE_URL);
			let res = await client
				.getAccountResource(address, `0x1::coin::CoinStore<${coinType}>`)
				.then((res: any) => {
					console.log('coin store', res);
					return res.data;
				});
			if (res) return true;
			return false;
		} catch (error) {
			return false;
		}
	}

	async function registerCoin(coinType = COIN_TYPE) {
		const func = '0x1::managed_coin::register';
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: [coinType],
			arguments: [],
		};
		return signAndSubmitTransaction(payload);
	}

	async function faucet(coinType: any, decimal: number) {
		let amount = 100 * 10 ** decimal;
		const func = `${REACT_APP_MARKET_ADDRESS}::claim_coin_test::claim`;
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: [coinType],
			arguments: [amount],
		};
		return signAndSubmitTransaction(payload);
	}

	async function getBalanceCoin(coinType: any, address: string) {
		try {
			let value = 0;
			let coinInfo = ListTokenPaymentTestNet.find((coin) => coin.type === coinType);
			const NODE_URL = APTOS_NODE_URL[chainId];
			const client = new AptosClient(NODE_URL);
			value = await client
				.getAccountResource(address, `0x1::coin::CoinStore<${coinType}>`)
				.then((res: any) => {
					console.log(res.data.coin.value);
					console.log(coinInfo?.decimals);
					value = res.data.coin.value / 10 ** coinInfo?.decimals!;
					console.log(value);
					return value;
				});
			return value;
		} catch (error) {
			return 0;
		}
	}

	return {
		checkEnableReceivingNFT,
		enableReceivingNFT,
		directTransferToken,
		checkCoinStore,
		registerCoin,
		faucet,
		getBalanceCoin,
	};
}

export default useTransfer;
