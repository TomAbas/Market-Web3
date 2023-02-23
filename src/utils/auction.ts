import { nftItem } from './../models/item';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState } from 'react';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
function useAuctionModules(itemInfo: nftItem, auctionInfo: any) {
	const [coinType, setCoinType] = useState('');
	const { account, signAndSubmitTransaction } = useWallet();
	async function createAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::create_auction`,
				type_arguments: [auctionInfo.coinType],
				arguments: [
					itemInfo.creator,
					itemInfo.collectionInfo.collectionName,
					itemInfo.itemName,
					0,
					auctionInfo.startTime,
					auctionInfo.endTime,
					auctionInfo.withdrawTime,
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}
	async function bidAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::bid_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}
	async function cancelAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::cancel_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function finalizeAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::finalize_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function increaseBid() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::increase_bid`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function initializeAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::initialize_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function initializeAuctionFee() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::initialize_auction_fee`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function withdrawCoinFromAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::withdraw_coin_from_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}
	return { createAuction, bidAuction };
}

export default useAuctionModules;
