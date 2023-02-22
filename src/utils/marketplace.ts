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
import { AptosClient, HexString } from 'aptos';
import { APTOS_NODE_URL, APTOS_FAUCET_URL } from 'constants/aptos.constant';
import { orderSell } from 'models/transaction';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

function useBuyItemAptos(item: nftItem, orderInfo?: orderSell) {
	const [supply, setSupply] = useState('');
	const [price, setPrice] = useState('');
	const [coinType, setCoinType] = useState<any>();
	const [startTime, setStartTime] = useState('');
	const [expirationTime, setExpirationTime] = useState('');
	const [withdrawExpirationTime, setWithdrawExpirationTime] = useState('');
	const [statusWithdraw, setStatusWithdraw] = useState('Cancel');
	const [statusList, setStatusList] = useState('Sell Item');
	const dispatch = useAppDispatch();
	const listNftOrders = useAppSelector(selectListNftOrders);
	const userInfo = useAppSelector(selectUser);
	const { account, signAndSubmitTransaction } = useWallet();
	const { userTokenAmount } = useGetAcountTokenAmount(userInfo?.userAddress!, item);
	const navigate = useNavigate();
	useEffect(() => {
		console.log(startTime);
		console.log(expirationTime);
		console.log(withdrawExpirationTime);
	}, [startTime, expirationTime, withdrawExpirationTime]);
	async function buyItemAptos(
		handleNext: () => void = () => {},
		startLoading: () => void = () => {},
		failToComplete: () => void = () => {},
		completeTaskSuccess: () => void = () => {}
	) {
		if (!userInfo?.userAddress) {
			dispatch(openFirstModal());
			return;
		}
		startLoading();
		try {
			const payload: TransactionPayload = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::marketplace::buy_token`,
				type_arguments: [orderInfo!.coinType],
				arguments: [orderInfo!.maker, orderInfo!.creationNumber],
			};
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				let listItem: any = {
					maker: userInfo?.userAddress,
					chainId: '2',
					price: orderInfo!.minPrice,
					quantity: orderInfo?.amount,
					to: orderInfo?.maker,
					txHash: res.hash,
					itemName: item.itemName,
					collectionName: item.collectionInfo.collectionName,
					creator: item.creator,
					owner: getItemFromOrder(listNftOrders, item)?.owner,
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
				function: `${MARKET_ADDRESS}::marketplace::cancel_list_token`,
				type_arguments: [orderInfo!.coinType],
				arguments: [orderInfo?.creationNumber.toString()],
			};
			console.log(payload);

			// await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
			// 	let listItem: any = {
			// 		maker: userInfo?.userAddress,
			// 		chainId: '2',
			// 		price: item?.price,
			// 		quantity: getItemFromOrder(listNftOrders, item!)?.amount,
			// 		to: MARKET_ADDRESS,
			// 		txHash: res.hash,
			// 		itemName: item.itemName,
			// 		collectionName: item.collectionInfo.collectionName,
			// 		creator: item.creator,
			// 		owner: getItemFromOrder(listNftOrders, item!)?.owner,
			// 	};
			// 	cancelOrder(listItem).then((res: any) => dispatch(handleTrigger()));
			// });
			let listItem: any = {
				maker: orderInfo?.maker,
				txHash: 'hjasjkhabdskjsd',
				orderId: orderInfo?._id,
				chainId: '2',
			};
			cancelOrder(listItem).then((res: any) => dispatch(handleTrigger()));

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

			let newPrice = changeTokenToWei(price, coinType!.decimals);
			setStatusList('Processing...');
			const payload: any = {
				type: 'entry_function_payload',
				function: `${MARKET_ADDRESS}::marketplace::list_token`,
				type_arguments: [coinType!.type],
				arguments: [
					item.creator,
					item.collectionInfo.collectionName,
					item.itemName,
					'0',
					supply,
					newPrice.toString(),
					Math.floor(Number(startTime) / 1000).toString(),
					Math.floor(Number(expirationTime) / 1000).toString(),
					Math.floor(Number(withdrawExpirationTime) / 1000).toString(),
				],
			};
			console.log(payload);
			await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then((res) => {
				console.log('res', res);
				let listItem: any = {
					startTime,
					endTime: expirationTime,
					coinType: coinType.type,
					itemId: item._id,
					maker: userInfo?.userAddress,
					chainId: '2',
					price: newPrice,
					quantity: supply,
					to: MARKET_ADDRESS,
					txHash: res.hash,
					instantSale: true,
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
		setStartTime,
		setExpirationTime,
		setWithdrawExpirationTime,
		setCoinType,
	};
}

export default useBuyItemAptos;
