import { InputItem, InputTitle, InputImage } from 'components/Mint/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateNFT } from 'models/common';
import { Box, Select, FormControl, MenuItem } from '@mui/material';
import UploadMediaCustom from './UploadMediaCustom';

interface Props {
	handleOpenModalBuy: any;
	updateFormInput: any;
	handleInputFileMintNft: any;
	collections: any;
	base64image: any;
}
const FormMintNft: React.FC<Props> = ({
	handleOpenModalBuy,
	updateFormInput,
	handleInputFileMintNft,
	collections,
	base64image,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InputCreateNFT>();
	const handleDropFile = (e: any) => {
		handleInputFileMintNft(e[0]);
		setValue('file', e[0]);
		errors.file = undefined;
	};
	const onSubmit = handleSubmit((data) => {
		console.log(data);
		updateFormInput(data);
		if (
			!errors.file &&
			!errors.amount &&
			!errors.collection &&
			!errors.description &&
			!errors.name &&
			!errors.royaltyFee
		) {
			handleOpenModalBuy();
		}
	});

	const [collection, setCollection] = useState('');

	return (
		<>
			{' '}
			<form onSubmit={onSubmit}>
				<InputImage>
					{/* <input
						type="file"
						className="my-4"
						{...register('file', { required: true })}
						onChange={(e) => {
							handleInputFileMintNft(e);
							errors.file = undefined;
						}}
					/> */}
					<UploadMediaCustom
						onDrop={handleDropFile}
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							borderRadius: '12px',
							padding: 1,
							border: '1px dashed #5A5D79',
							objectFit: 'contain',
						}}
						accept={{
							'image/*': ['.png', '.jpeg', '.jpg'],
						}}
						file={base64image}
						maxSize={10485760}
						error={Boolean(errors.file)}
						{...register(`file`, { required: true })}
					/>
					{errors.file && <p>Image is required</p>}
				</InputImage>

				<InputItem>
					<InputTitle>
						Collection<span>*</span>
					</InputTitle>
					<FormControl sx={{ minWidth: 120, width: '100%' }}>
						<Select
							value={collection}
							// onChange={handleChange}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							{...register('collection', { required: true })}
						>
							{collections.map((collection: any, index: any) => (
								<MenuItem
									key={index}
									value={collection.name}
									onClick={() => {
										setCollection(collection.name);
									}}
								>
									<em>{collection.name}</em>
								</MenuItem>
							))}
						</Select>
						{errors.collection && <p>Collection name is required</p>}
					</FormControl>
				</InputItem>
				<InputItem>
					<InputTitle>
						Item name<span>*</span>
					</InputTitle>
					<input
						type="text"
						placeholder="Item name"
						{...register('name', { required: true })}
					/>
					{errors.name && <p>Item name is required</p>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Item Description<span>*</span>
					</InputTitle>
					<input
						type="text"
						placeholder="Provide a detailed description of your item."
						{...register('description', { required: true })}
					/>
					{errors.description && <p>Item description is required</p>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Royalty Fee (%)<span>*</span>
					</InputTitle>
					<input
						type="number"
						placeholder="1"
						{...register('royaltyFee', { required: true, min: 1, max: 999 })}
					/>
					{errors.royaltyFee && <p>Royalty Fee is required</p>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Supply<span>*</span>
					</InputTitle>
					<input
						type="number"
						placeholder="1"
						{...register('amount', { required: true, min: 1, max: 999 })}
					/>
					{errors.amount && <p>Amount is required</p>}
				</InputItem>
				<Box
					sx={{
						mt: 2,
						pointerEvents:
							errors.file ||
							errors.amount ||
							errors.collection ||
							errors.description ||
							errors.name ||
							errors.royaltyFee
								? 'none'
								: 'all',
						button: {
							padding: '10px 30px',
							border: '1.5px solid #e7e8ec',
							transition: 'all 0.4s',
							borderRadius: '12px',
							fontWeight: 500,
							background:
								errors.file ||
								errors.amount ||
								errors.collection ||
								errors.description ||
								errors.name ||
								errors.royaltyFee
									? '#e7e8ec'
									: '#fff',
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
					<button type="submit">Create</button>
				</Box>
			</form>
		</>
	);
};

// const handleChange = () => {};

export default FormMintNft;
