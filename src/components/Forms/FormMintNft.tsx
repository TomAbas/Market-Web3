import { InputItem, InputTitle } from 'components/Mint/styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateNFT } from 'models/common';
import { Box } from '@mui/material';

interface Props {
	handleOpenModalBuy: any;
	updateFormInput: any;
	handleInputFileMintNft: any;
}
const FormMintNft: React.FC<Props> = ({
	handleOpenModalBuy,
	updateFormInput,
	handleInputFileMintNft,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputCreateNFT>();
	const onSubmit = handleSubmit((data) => {
		console.log(data);
		updateFormInput(data);
		handleOpenModalBuy();
	});
	return (
		<>
			{' '}
			<form onSubmit={onSubmit}>
				<input
					type="file"
					className="my-4"
					{...register('file', { required: true })}
					onChange={handleInputFileMintNft}
				/>
				{errors.file && 'Image is required'}
				<InputItem>
					<InputTitle>Collection name</InputTitle>
					<input
						type="text"
						placeholder="Collection Name"
						{...register('collection', { required: true })}
					/>
					{errors.collection && 'Collection name is required'}
				</InputItem>
				<InputItem>
					<InputTitle>Item name</InputTitle>
					<input
						type="text"
						placeholder="Item name"
						{...register('name', { required: true })}
					/>
					{errors.name && 'Item name is required'}
				</InputItem>
				<InputItem>
					<InputTitle>Item Description</InputTitle>
					<input
						type="text"
						placeholder="Provide a detailed description of your item."
						{...register('description', { required: true })}
					/>
					{errors.description && 'Item description is required'}
				</InputItem>

				<InputItem>
					<InputTitle>Royalty Fee (%)</InputTitle>
					<input
						type="number"
						placeholder="1"
						{...register('royaltyFee', { required: true, min: 1, max: 99 })}
					/>
					{errors.royaltyFee && 'Royalty Fee is required'}
				</InputItem>
				<InputItem>
					<InputTitle>Supply</InputTitle>
					<input
						type="number"
						placeholder="1"
						{...register('amount', { required: true, min: 1, max: 99 })}
					/>
					{errors.amount && 'Amount is required'}
				</InputItem>
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
					onClick={handleOpenModalBuy}
				>
					<button>Create</button>
				</Box>
			</form>
		</>
	);
};

export default FormMintNft;

{
	/* <InputItem>
				<InputTitle>Blockchain</InputTitle>
				<FormControl sx={{ minWidth: 120, width: '100%' }}>
					<Select
						value={age}
						onChange={handleChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="">
							<em>Aptos</em>
						</MenuItem>
						<MenuItem value={30}>Sui</MenuItem>
					</Select>
				</FormControl>
			</InputItem> */
}
