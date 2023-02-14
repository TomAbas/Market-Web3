/* eslint-disable @typescript-eslint/no-unused-vars */
import { nftItem } from 'models/item';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openFirstModal } from 'redux/slices/modalWallet';
import useControlModal from 'hooks/useControlModal';
import { toast } from 'react-toastify';
import { buyItem, cancelOrder, sellItem } from 'api/collections/collectionApi';
import { getBalanceToken } from 'service/aptos.service';
import { useEffect, useState } from 'react';
import { selectListNftOrders } from 'redux/slices/orderResource';
import { getItemFromOrder } from './dataResource';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { changeTokenToWei } from './function';
import { selectUser } from 'redux/slices/userInfo';
import useGetAcountTokenAmount from 'hooks/useGetAcountTokenAmount';
import { handleTrigger } from 'redux/slices/nftFilter';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

function useBuyItemAptos(offer: nftItem) {
	const [supply, setSupply] = useState('');
	const [price, setPrice] = useState('');
	const [statusWithdraw, setStatusWithdraw] = useState('Cancel');
	const [statusList, setStatusList] = useState('Sell Item');
	const dispatch = useAppDispatch();
	const listNftOrders = useAppSelector(selectListNftOrders);
	const userInfo = useAppSelector(selectUser);
	const { account, signAndSubmitTransaction } = useWallet();
	const navigate = useNavigate();
	async function buyItemAptos(
		handleNext: () => void,
		startLoading: () => void,
		failToComplete: () => void,
		completeTaskSuccess: () => void
	) {
		if (!userInfo?.userAddress) {
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
					maker: userInfo?.userAddress,
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
				buyItem(listItem).then((res: any) => dispatch(handleTrigger()));
				completeTaskSuccess();
				toast.success('Successful purchase an item');
			});

			handleNext();
		} catch (error) {
			toast.error('Something went wrong. Try again!');
			failToComplete();
			handleNext();
		}
	}
	async function handleWithdrawItem() {
		if (!userInfo?.userAddress) {
			dispatch(openFirstModal());
			return;
		}
		setStatusWithdraw('...');
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::withdraw_token`,
				type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
				arguments: [
					offer?.creator,
					offer?.collectionInfo.collectionName,
					offer?.itemName,
					'0',
				],
			};

			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					maker: userInfo?.userAddress,
					chainId: '2',
					price: offer?.price,
					quantity: getItemFromOrder(listNftOrders, offer!)?.amount,
					to: MARKET_ADDRESS,
					txHash: res.hash,
					itemName: offer.itemName,
					collectionName: offer.collectionInfo.collectionName,
					creator: offer.creator,
					owner: getItemFromOrder(listNftOrders, offer!)?.owner,
				};
				cancelOrder(listItem).then((res: any) => dispatch(handleTrigger()));
			});

			toast.success('Successful cancel listing');
			navigate('/profile');
		} catch {
			toast.error('Something went wrong. Try again!');
			setStatusWithdraw('Cancel');
		}
	}
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
	async function sellItemAptos() {
		try {
			if (!supply || !price || supply === '0' || price === '0') {
				return;
			}

			let newPrice = changeTokenToWei(price);
			setStatusList('Processing...');
			const payload: any = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::market::list_token`,
				type_arguments: [MARKET_COINT_TYPE],
				arguments: [
					offer.creator,
					offer.collectionInfo.collectionName,
					offer.itemName,
					'0',
					supply,
					newPrice.toString(),
				],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					maker: userInfo?.userAddress,
					chainId: '2',
					price: newPrice,
					quantity: supply,
					to: MARKET_ADDRESS,
					txHash: res.hash,
					itemName: offer.itemName,
					collectionName: offer.collectionInfo.collectionName,
					owner: userInfo?.userAddress,
					creator: offer.creator,
				};
				console.log(listItem);
				toast.success('Successful list an item');
				sellItem(listItem).then((res) => {
					dispatch(handleTrigger());
				});
			});
			setStatusList('Sell Item');
			navigate('/view-all/items');
			// handleItems(index);
		} catch (error) {
			setStatusList('Sell Item');
		}
	}

	return {
		buyItemAptos,
		handleWithdrawItem,
		statusWithdraw,
		setSupply,
		setPrice,
		supply,
		price,
		statusList,
		sellItemAptos,
		handleValidateAmount,
	};
}

export default useBuyItemAptos;
