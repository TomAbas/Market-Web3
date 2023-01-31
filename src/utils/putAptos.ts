import { nftItem } from 'models/item';
import { TransactionPayload } from '@martiandao/aptos-web3-bip44.js/dist/generated';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useAppDispatch } from 'redux/hooks';
import { openFirstModal } from 'redux/slices/modalWallet';
import useControlModal from 'hooks/useControlModal';
import { toast } from 'react-toastify';
import { buyItem } from 'api/collectionApi';
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;

async function BuyItemAptos(offer: nftItem) {
	const dispatch = useAppDispatch();
	const { account, signAndSubmitTransaction } = useWallet();
	const { handleNext, startLoading, failToComplete } = useControlModal();
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
			arguments: [offer.creator, offer.collectionInfo.collectionName, offer.itemName, 0],
		};

		let hash = await signAndSubmitTransaction(payload, { gas_unit_price: 100 }).then(
			(res) => res.hash
		);
		let listItem: any = {
			maker: account?.address?.toString(),
			chainId: '2',
			price: offer.price,
			quantity: '1', //wait for api offer of item
			to: MARKET_ADDRESS,
			txHash: hash,
			itemName: offer.itemName,
			collectionName: offer.collectionInfo.collectionName,
			creator: offer.creator,
			owner: offer.owner[0],
		};
		buyItem(listItem);
		toast.success('Successfully purchased an item');
		handleNext();
	} catch (error) {
		toast.error('Something went wrong. Try again!');
		failToComplete();
		handleNext();
	}
}
export { BuyItemAptos };
