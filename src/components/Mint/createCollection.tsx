import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState, ChangeEvent } from 'react';

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
	console.log(MARKET_ADDRESS, MARKET_COINT_TYPE);
	// const { account, signAndSubmitTransaction } = useWallet();
	// const [base64image, setBase64image] = useState('');
	const [formInput, updateFormInput] = useState<{
		name: string;
		description: string;
		file: File | null;
	}>({
		name: '',
		description: '',
		file: null,
	});

	async function onChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0];
		updateFormInput({ ...formInput, file: file });
		// const reader = new FileReader();
		// reader.onload = function (event) {
		// 	setBase64image(event.target!.result!.toString());
		// };
		// reader.readAsDataURL(file);
	}
	// async function createCollection() {
	// 	const { name, description, file } = formInput;
	// 	if (!account || !name || !description || !file) return;
	// 	try {
	// 		console.log('1');
	// 		const token = await nftStorage.upload(file, name, description);
	// 		const image = await nftStorage.getImageURL(token.url);
	// 		console.log('2');
	// 		await signAndSubmitTransaction(
	// 			{
	// 				type: 'entry_function_payload',
	// 				function: `${MARKET_ADDRESS}::nft::create_collection`,
	// 				type_arguments: [MARKET_COINT_TYPE || ''],
	// 				arguments: [name, description, image],
	// 			},
	// 			{
	// 				gas_unit_price: 100,
	// 			}
	// 		);
	// 	} catch (error) {
	// 		console.log('Error create NFT: ', error);
	// 	} finally {
	// 	}
	// }

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
			<RedBar />
			<input type="file" name="Asset" className="my-4" onChange={onChange} />
			{/* {base64image && <img className="rounded mt-4" width="350" src={base64image} />} */}
			<RedBar />
			<Button variant="contained">Create</Button>
		</Box>
	);
}
