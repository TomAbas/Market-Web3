/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState, ChangeEvent } from 'react';
import { openFirstModal } from '../../redux/slices/modalWallet';
import { useAppDispatch } from '../../redux/hooks';
// import FieldInput from 'components/CustomField/FieldInput';
import { InputItem, InputTitle } from './styled';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function LayoutCreateCollection() {
	const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
	const MARKET_COINT_TYPE = process.env.REACT_APP_MARKET_COIN_TYPE;
	const dispatch = useAppDispatch();
	const { account, signAndSubmitTransaction } = useWallet();
	const [loading, setLoading] = useState('Create');
	const [base64image, setBase64image] = useState('');
	const [formInput, updateFormInput] = useState<{
		name: string;
		description: string;
		file: File | null;
	}>({
		name: '',
		description: '',
		file: null,
	});

	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};

	async function onChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		updateFormInput({ ...formInput, file: file });
		const reader = new FileReader();
		reader.onload = function (event) {
			setBase64image(event.target!.result!.toString());
		};
		reader.readAsDataURL(file);
	}
	const createCollection = async () => {
		const { name, description, file } = formInput;
		if (!account) {
			dispatch(openFirstModal());
			return;
		}
		if (!name || !description || !file) return;
		try {
			setLoading('Creating...');
			console.log(file);
			const sotrageRef = ref(storage, `item/${file.name}`);
			const uploadTask = uploadBytesResumable(sotrageRef, file);
			uploadTask.on(
				'state_changed',
				() => {},
				(error) => console.log('err ', error),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						// console.log("File available at", downloadURL);
						try {
							await signAndSubmitTransaction(
								{
									type: 'entry_function_payload',
									function: `${MARKET_ADDRESS}::nft::create_collection`,
									type_arguments: [
										MARKET_COINT_TYPE || '0x1::aptos_coin::AptosCoin',
									],
									arguments: [name, description, downloadURL],
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
				// '& .MuiTextField-root': { width: '25ch' },
			}}
		>
			{/* <TextField
				label={'collection name'}
				id="margin-dense"
				margin="dense"
				onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
			/>
			<RedBar />
			
			<TextField
				label={'collection description'}
				id="margin-normal"
				margin="normal"
				onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
			/>
			<RedBar /> */}
			<input type="file" name="Asset" className="my-4" onChange={onChange} />
			<InputItem>
				<InputTitle>Name</InputTitle>
				<input type="text" placeholder="Collection Name" />
			</InputItem>
			<InputItem>
				<InputTitle>Description</InputTitle>
				<input type="text" placeholder="Description" />
			</InputItem>
			<InputItem>
				<InputTitle>Category</InputTitle>
				<FormControl sx={{ minWidth: 120, width: '100%' }}>
					<Select
						value={age}
						onChange={handleChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="">
							<em>Category Name</em>
						</MenuItem>
						<MenuItem value={10}>Other</MenuItem>
						<MenuItem value={20}>Art</MenuItem>
						<MenuItem value={30}>Sport</MenuItem>
					</Select>
				</FormControl>
			</InputItem>
			<InputItem>
				<InputTitle>Royalty</InputTitle>
				<input type="text" placeholder="E.g 2.5" />
			</InputItem>
			{/* {base64image && <img className="rounded mt-4" width="350" src={base64image} />}
			<RedBar /> */}
			<Box
				sx={{
					mt: 2,
					button: {
						padding: '10px 30px',
						border: '1.5px solid #e7e8ec',
						transition: 'all 0.4s',
						borderRadius: '12px',
						fontWeight: 500,
						background: '#fff',
						fontSize: '20px',
						cursor: 'pointer',
						fontFamily: 'Montserrat, sans-serif !important',
						fontStyle: 'italic !important',
						width: '180px',
						'&:hover': {
							background: '#007aff',
							borderColor: 'transparent',
							color: '#fff',
						},
						a: {
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'none',
								color: '#fff',
							},
						},
					},
				}}
			>
				<button>Create</button>
			</Box>
		</Box>
	);
}
