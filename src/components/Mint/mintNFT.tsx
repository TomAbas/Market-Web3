import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

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
				label={'collection'}
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
			<input type="file" name="Asset" className="my-4" />
			<RedBar />
			<Button variant="contained">Create</Button>
		</Box>
	);
}
