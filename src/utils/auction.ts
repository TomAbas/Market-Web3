import { orderSell } from './../models/transaction';
import { selectUser } from 'redux/slices/userInfo';
import { handleTrigger } from 'redux/slices/nftFilter';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { sellItem } from 'api/collections/collectionApi';
import { nftItem } from './../models/item';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { changeTokenToWei, changePriceToToken, changeTokenToWeiByCoinType } from './function';
import { useNavigate } from 'react-router-dom';
import { finalAuction } from 'api/items/itemsApi';
import { cancelAuction as cancelAuctionApi } from 'api/collections/collectionApi';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
function useAuctionModules(itemInfo: nftItem, orderInfo?: orderSell) {
	const userInfo = useAppSelector(selectUser);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [supply, setSupply] = useState('');
	const [startPrice, setStartPrice] = useState('');
	const [coinType, setCoinType] = useState<any>();
	const { account, signAndSubmitTransaction } = useWallet();
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [withdrawTime, setWithdrawTime] = useState('');
	const [priceBid, setPriceBid] = useState('');
	async function createAuction() {
		if (!supply || !startPrice || !coinType || !startTime || !endTime || !withdrawTime) return;
		try {
			let newPrice = changeTokenToWei(startPrice, coinType!.decimals);
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::auction_token`,
				type_arguments: [coinType.type],
				arguments: [
					itemInfo.creator,
					itemInfo.collectionInfo.collectionName,
					itemInfo.itemName,
					0,
					supply,
					newPrice,
					Math.floor(Number(startTime) / 1000),
					Math.floor(Number(endTime) / 1000),
					Math.floor(Number(withdrawTime) / 1000),
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					startTime,
					endTime: endTime,
					coinType: coinType.type,
					itemId: itemInfo._id,
					maker: userInfo?.userAddress,
					chainId: '2',
					price: newPrice,
					quantity: supply,
					to: MARKET_ADDRESS,
					txHash: res.hash,
					instantSale: false,
				};
				toast.success('Successful list an item');
				sellItem(listItem).then((res) => {
					if (res.data.data._id) {
						navigate(`/auction/${res.data.data._id}`);
					}
					dispatch(handleTrigger());
				});
			});
		} catch (error) {}
	}

	async function cancelAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::cancel_auction`,
				type_arguments: [orderInfo?.coinType!],
				arguments: [orderInfo?.auctionId],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(async (res) => {
				await cancelAuctionApi(userInfo?.userAddress!, res.hash, orderInfo?._id!);
				navigate(`/item/${orderInfo?.itemId}`);
				toast.success('Successful list an item');
			});
		} catch (error) {}
	}
	async function bidAuction() {
		try {
			let newPrice = changeTokenToWeiByCoinType(priceBid, orderInfo?.coinType);
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::bid`,
				type_arguments: [orderInfo?.coinType!],
				arguments: [
					itemInfo.creator,
					itemInfo.collectionInfo.collectionName,
					itemInfo.itemName,
					0,
					orderInfo?.amount!,
					newPrice,
					orderInfo?.auctionId,
					Math.floor(Number(orderInfo?.expirationTime!) / 1000),
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(async (res) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				dispatch(handleTrigger());
			});
		} catch (error) {}
	}
	async function cancelBid() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::cancel_bid`,
				type_arguments: [orderInfo?.coinType!],
				arguments: [orderInfo?.auctionId],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(async (res) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				dispatch(handleTrigger());
			});
		} catch (error) {}
	}

	async function increaseBid() {
		try {
			let newPrice = changeTokenToWeiByCoinType(priceBid, orderInfo?.coinType);
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::increase_bid`,
				type_arguments: [orderInfo?.coinType!],
				arguments: [newPrice, orderInfo?.auctionId],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(async (res) => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				dispatch(handleTrigger());
			});
		} catch (error) {}
	}

	async function initializeAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::initialize_auction`,
				type_arguments: [coinType],
				arguments: [],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {});
		} catch (error) {}
	}

	async function finalizeAuction() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::finalize_auction`,
				type_arguments: [orderInfo?.coinType!],
				arguments: [orderInfo?.auctionId],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				finalAuction(res.hash, orderInfo!.itemId, orderInfo!._id);
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
				type_arguments: [orderInfo?.coinType!],
				arguments: [orderInfo?.maker!, orderInfo?.creationNumber],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {});
		} catch (error) {
			console.log(error);
		}
	}
	function handleValidateAmount(e: any, userTokenAmount: string) {
		if (e.target.value.includes('.')) {
			e.target.value = e.target.value.split('.')[0];
			setSupply(e.target.value);
		}
		if (Number(e.target.value) > Number(userTokenAmount)) {
			e.target.value = userTokenAmount;
			setSupply(e.target.value);
		} else if (Number(e.target.value) < 0) {
			e.target.value = -Number(e.target.value);
			setSupply(e.target.value);
		}
		setSupply(e.target.value);
	}
	return {
		handleValidateAmount,
		startPrice,
		setStartPrice,
		setCoinType,
		setPriceBid,
		setStartTime,
		setEndTime,
		setWithdrawTime,
		createAuction,
		cancelAuction,
		bidAuction,
		cancelBid,
		finalizeAuction,
		increaseBid,
		initializeAuction,
		withdrawCoinFromAuction,
		priceBid,
	};
}

export default useAuctionModules;
