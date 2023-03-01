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
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
function useAuctionModules(itemInfo: nftItem, orderInfo?: orderSell) {
	const userInfo = useAppSelector(selectUser);
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
			console.log(payload);
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log('res', res);
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
				console.log(listItem);
				toast.success('Successful list an item');
				sellItem(listItem).then((res) => {
					dispatch(handleTrigger());
				});
			});
		} catch (error) {
			console.log(error);
		}
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
					orderInfo?.expirationTime!,
				],
			};
			console.log(payload);
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	}
	async function cancelBid() {
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::auction::cancel_bid`,
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
				arguments: [
					itemInfo.creator,
					itemInfo.collectionInfo.collectionName,
					itemInfo.itemName,
					0,
					orderInfo?.amount!,
					deltaPrice,
					orderInfo?.auctionId,
					orderInfo?.expirationTime!,
				],
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
	//function helpers
	function handleValidateAmount(e: any, userTokenAmount: string) {
		console.log(userTokenAmount);
		if (e.target.value.includes('.')) {
			e.target.value = e.target.value.split('.')[0];
			setSupply(e.target.value);
		}
		if (Number(e.target.value) > Number(userTokenAmount)) {
			e.target.value = userTokenAmount;
			setSupply(e.target.value);
		} else if (Number(e.target.value) < 0) {
			console.log('12');
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
		bidAuction,
		cancelBid,
		finalizeAuction,
		increaseBid,
		initializeAuction,
		initializeAuctionFee,
		withdrawCoinFromAuction,
	};
}

export default useAuctionModules;
