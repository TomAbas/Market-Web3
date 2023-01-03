import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, ChangeEvent } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { openFirstModal } from '../../redux/slices/modalWallet';
import { useAppDispatch } from '../../redux/hooks';

function RedBar() {
	return (
		<Box
			sx={{
				height: 20,
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? 'rgba(255, 0, 0, 0)'
						: 'rgb(255 132 132 / 25%)',
			}}
		/>
	);
}

export default function LayoutMintNFT() {
	const [loading, setLoading] = useState('Create');
	const [base64image, setBase64image] = useState('');
	const { account, signAndSubmitTransaction } = useWallet();
	const dispatch = useAppDispatch();
	const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
	const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
	const [formInput, updateFormInput] = useState<{
		collection: string;
		name: string;
		description: string;
		amount: number;
		royaltyFee: number;
		file: File | null;
	}>({
		collection: '',
		name: '',
		description: '',
		amount: 1,
		royaltyFee: 0,
		file: null,
	});

	async function onChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		updateFormInput({ ...formInput, file: file });
		const reader = new FileReader();
		reader.onload = function (event) {
			setBase64image(event.target!.result!.toString());
		};
		reader.readAsDataURL(file);
	}

	const createItem = async () => {
		const { collection, name, description, amount, royaltyFee, file } = formInput;
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		if (!collection || !name || !description || !amount || !royaltyFee || !file) return;
		try {
			setLoading('Creating...');
			const sotrageRef = ref(storage, `collection/${file.name}`);
			const uploadTask = uploadBytesResumable(sotrageRef, file);
			uploadTask.on(
				'state_changed',
				() => {},
				(error) => console.log('err ', error),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						// console.log("File available at", downloadURL);
						try {
							const royaltyFeeNumerator = royaltyFee * 100;
							const royaltyFeeDenominator = 10000;

							await signAndSubmitTransaction(
								{
									type: 'entry_function_payload',
									function: `${MARKET_ADDRESS}::nft::mint_nft`,
									type_arguments: [
										MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin',
									],
									arguments: [
										name,
										description,
										downloadURL,
										collection,
										amount,
										account.address,
										royaltyFeeNumerator,
										royaltyFeeDenominator,
									],
								},
								{
									gas_unit_price: 100,
								}
							);
							setLoading('Create');
						} catch (error) {
							setLoading('Create');
						}
					});
				}
			);
		} catch (error) {
			console.log('Error create NFT: ', error);
			setLoading('Create');
		} finally {
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				'& .MuiTextField-root': { width: '25ch' },
			}}
		>
			<RedBar />
			<TextField
				label={'collection name'}
				id="margin-none"
				onChange={(e) => updateFormInput({ ...formInput, collection: e.target.value })}
			/>
			<RedBar />
			<TextField
				label={'item name'}
				id="margin-dense"
				margin="dense"
				onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
			/>
			<RedBar />
			<TextField
				label={'item description'}
				id="margin-normal"
				margin="normal"
				onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
			/>
			<RedBar />
			<TextField
				label={'item supply'}
				id="margin-normal"
				margin="normal"
				onChange={(e) =>
					updateFormInput({ ...formInput, amount: parseInt(e.target.value) })
				}
			/>
			<RedBar />
			<TextField
				label={'royalty fee (%)'}
				id="margin-normal"
				margin="normal"
				onChange={(e) =>
					updateFormInput({ ...formInput, royaltyFee: parseInt(e.target.value) })
				}
			/>
			<RedBar />
			<input type="file" name="Asset" className="my-4" onChange={onChange} />
			{base64image && <img className="rounded mt-4" width="350" src={base64image} />}
			<RedBar />
			<Button variant="contained" onClick={createItem}>
				{loading}
			</Button>
		</Box>
	);
}
