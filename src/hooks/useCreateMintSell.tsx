import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase';
import { InputCreateCollection, InputCreateNFT } from 'models/common';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { openFirstModal } from 'redux/slices/modalWallet';
import { toast } from 'react-toastify';
import ImageInputDefault from '../assets/icons/default-img-input2.png';
const useCreateMintSell = () => {
	const dispatch = useAppDispatch();
	const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
	const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
	const { account, signAndSubmitTransaction } = useWallet();
	const [base64image, setBase64image] = useState<any>(ImageInputDefault);
	const [formInput, updateFormInput] = useState<InputCreateCollection>({
		name: '',
		description: '',
		file: null,
	});
	const [formInputNFT, setFormInputNFT] = useState<InputCreateNFT>({
		collection: '',
		name: '',
		description: '',
		amount: 1,
		royaltyFee: 0,
		file: null,
	});

	const handleInputFile = (e: any) => {
		console.log(e);
		const file = e[0];
		if (file) {
			console.log('chay');
			// const file = e[0];
			setBase64image({ ...file, preview: URL.createObjectURL(file) });
		}
	};
	const handleInputFileMintNft = (e: any) => {
		if (e) {
			const file = e;
			setBase64image({ ...file, preview: URL.createObjectURL(file) });
		}
	};
	const createCollection = (
		startLoading: () => void,
		completeTaskSuccess: () => void,
		handleNext: () => void,
		failToComplete: () => void
	) => {
		const { name, description, file } = formInput;
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		if (!name || !description || !file) {
			failToComplete();
			handleNext();
			return;
		}
		try {
			startLoading();
			const sotrageRef = ref(storage, `collection/${file.name}`);
			const uploadTask = uploadBytesResumable(sotrageRef, file);
			uploadTask.on(
				'state_changed',
				() => {},
				(error) => console.log('err ', error),
				async () => {
					let downLoadUrl = await getDownloadURL(uploadTask.snapshot.ref);
					try {
						await signAndSubmitTransaction(
							{
								type: 'entry_function_payload',
								function: `${MARKET_ADDRESS}::nft::create_collection`,
								type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
								arguments: [name, description, downLoadUrl],
							},
							{
								gas_unit_price: 100,
							}
						);
						toast.success('Create collection success');
						completeTaskSuccess();
						handleNext();
					} catch (error: any) {
						console.log('Error create collection NFT: ', error);
						toast.error(error.message);
						failToComplete();
						handleNext();
					}
				}
			);
		} catch (error: any) {
			console.log('Error create NFT: ', error);
			toast.error(error.message);
			failToComplete();
			handleNext();
		}
	};
	const createItem = (
		startLoading: () => void,
		completeTaskSuccess: () => void,
		handleNext: () => void,
		failToComplete: () => void
	) => {
		const { collection, name, description, amount, royaltyFee, file } = formInputNFT;
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		if (!collection || !name || !description || !amount || !royaltyFee || !file) {
			failToComplete();
			handleNext();
			return;
		}
		try {
			startLoading();
			const sotrageRef = ref(storage, `item/${file.name}`);
			const uploadTask = uploadBytesResumable(sotrageRef, file);
			uploadTask.on(
				'state_changed',
				() => {},
				(error) => console.log('err ', error),
				async () => {
					let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					console.log(downloadURL);
					try {
						const royaltyFeeNumerator = Number(royaltyFee) * 100;
						const royaltyFeeDenominator = 10000;

						await signAndSubmitTransaction(
							{
								type: 'entry_function_payload',
								function: `${MARKET_ADDRESS}::nft::mint_nft`,
								type_arguments: [MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin'],
								arguments: [
									name,
									description,
									downloadURL,
									collection,
									Number(amount),
									account.address,
									royaltyFeeNumerator,
									royaltyFeeDenominator,
								],
							},
							{
								gas_unit_price: 100,
							}
						);
						toast.success('Create item success');
						completeTaskSuccess();
						handleNext();
					} catch (error: any) {
						console.log('Error create item NFT: ', error);
						toast.error(error.message);
						failToComplete();
						handleNext();
					}
				}
			);
		} catch (error: any) {
			console.log('Error create collection NFT: ', error);
			toast.error(error.message);
			failToComplete();
			handleNext();
		}
	};
	return {
		handleInputFileMintNft,
		handleInputFile,
		createCollection,
		base64image,
		updateFormInput,
		formInput,
		createItem,
		setFormInputNFT,
		formInputNFT,
	};
};

export default useCreateMintSell;
