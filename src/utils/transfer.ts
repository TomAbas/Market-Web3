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
import { create } from 'lodash';
import axios from 'axios';
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
			console.log(error);
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

	return { checkEnableReceivingNFT, enableReceivingNFT, directTransferToken };
}

export default useTransfer;
