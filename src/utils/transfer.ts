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
const chainId = '2';
const COIN_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE || '0x1::aptos_coin::AptosCoin';

function useTransfer() {
	const { signAndSubmitTransaction } = useWallet();
	async function enableTransfer(to: string, coinType = COIN_TYPE) {
		const extraArgs = {
			coinType: coinType,
			createReceiverIfMissing: true,
		};
		const func = '0x3::token::opt_in_direct_transfer';
		const typeArgs: any[] = [];
		// const toAddress = getAddressFromAccountOrAddress(to);
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: typeArgs,
			arguments: [true],
		};
		signAndSubmitTransaction(payload, extraArgs);
	}
	async function transfer(to: string, amount: string, coinType = COIN_TYPE) {
		const extraArgs = {
			coinType: coinType,
			createReceiverIfMissing: true,
		};
		const func = '0x1::coin::transfer';
		const typeArgs: any[] = [coinType];
		const payload: TransactionPayload = {
			type: 'entry_function_payload',
			function: func,
			type_arguments: typeArgs,
			arguments: [to, amount],
		};
		signAndSubmitTransaction(payload, extraArgs);
	}

	return { enableTransfer, transfer };
}

export default useTransfer;
