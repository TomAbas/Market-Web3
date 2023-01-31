/* eslint-disable @typescript-eslint/no-unused-vars */
import { nftItem } from 'models/item';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openFirstModal } from 'redux/slices/modalWallet';
import useControlModal from 'hooks/useControlModal';
import { toast } from 'react-toastify';
import { buyItem } from 'api/collectionApi';
import { getBalanceToken } from 'service/aptos.service';
import { useState } from 'react';
import { selectListNftOrders } from 'redux/slices/orderResource';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

export function getItemFromOrder(listNftOrders: any[], offer: nftItem) {
	let itemOrder = listNftOrders.find((item) => {
		if (
			item.token_id.token_data_id.creator === offer.creator &&
			item.token_id.token_data_id.collection === offer.collectionInfo.collectionName &&
			item.token_id.token_data_id.name === offer.itemName
		) {
			return true;
		}
		return false;
	});
	console.log(itemOrder);
	return itemOrder;
}
function useBuyItemAptos(offer: nftItem) {
	const dispatch = useAppDispatch();
	const listNftOrders = useAppSelector(selectListNftOrders);
	const { account, signAndSubmitTransaction } = useWallet();

	async function buyItemAptos(
		handleNext: () => void,
		startLoading: () => void,
		failToComplete: () => void,
		completeTaskSuccess: () => void
	) {
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		startLoading();
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::buy_token`,
				type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
				arguments: [
					offer.creator,
					offer.collectionInfo.collectionName,
					offer.itemName,
					'0',
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					maker: account?.address?.toString(),
					chainId: '2',
					price: offer.price,
					quantity: getItemFromOrder(listNftOrders, offer)?.amount,
					to: getItemFromOrder(listNftOrders, offer)?.owner,
					txHash: res.hash,
					itemName: offer.itemName,
					collectionName: offer.collectionInfo.collectionName,
					creator: offer.creator,
					owner: getItemFromOrder(listNftOrders, offer)?.owner,
				};
				buyItem(listItem);
				completeTaskSuccess();
				toast.success('Successfully purchased an item');
			});

			handleNext();
		} catch (error) {
			toast.error('Something went wrong. Try again!');
			failToComplete();
			handleNext();
		}
	}
	return { buyItemAptos };
}
export default useBuyItemAptos;
