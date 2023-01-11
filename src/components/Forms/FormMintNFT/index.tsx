import { InputItem, InputTitle, InputImage } from 'components/Mint/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateNFT } from 'models/common';
import { Box, Select, FormControl, MenuItem } from '@mui/material';
import UploadMediaCustom from '../UploadMediaCustom';
import { FieldSubTitle, FieldTitleName } from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';

interface Props {
	handleOpenModalBuy: any;
	updateFormInput: any;
	handleInputFileMintNft: any;
	collections: any;
	base64image: any;
	setDataFormInput: any;
}
const FormMintNft: React.FC<Props> = ({
	handleOpenModalBuy,
	updateFormInput,
	handleInputFileMintNft,
	collections,
	base64image,
	setDataFormInput,
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
		setDataFormInput(data);
	});

	const [collection, setCollection] = useState('');

	return (
		<>
			{' '}
			<form onSubmit={onSubmit}>
				<FieldTitleName>
					Image, Video, Audio, or 3D Model <Asterisk />
				</FieldTitleName>
				{/* <FieldSubTitle>
						Recommended file types: JPG, PNG, GIF, SVG, WEBM, MP4, MP3. Max size: 10 MB.
					</FieldSubTitle> */}
				<FieldSubTitle>Drag or choose your file to upload</FieldSubTitle>
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
					{/* <InputTitle>
						Image<span>*</span>
					</InputTitle> */}
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
							'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.mp3', '.mp4', '.glb'],
						}}
						file={base64image}
						maxSize={10485760}
						error={Boolean(errors.file)}
						{...register(`file`, { required: true })}
					/>
				</InputImage>
				{errors.file && <ErrorMessage>Image is required</ErrorMessage>}

				<InputItem>
					<InputTitle>
						Collection
						<Asterisk />
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
										setValue('collection', collection.name);
										setCollection(collection.name);
									}}
								>
									<em>{collection.name}</em>
								</MenuItem>
							))}
						</Select>
						{errors.collection && (
							<ErrorMessage>Collection name is required</ErrorMessage>
						)}
					</FormControl>
				</InputItem>
				<InputItem>
					<InputTitle>
						Item name <Asterisk />
					</InputTitle>
					<input
						type="text"
						placeholder="Example: Metaspacecy item"
						{...register('name', { required: true })}
					/>
					{errors.name && <ErrorMessage>Item name is required</ErrorMessage>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Item Description <Asterisk />
					</InputTitle>
					<input
						type="text"
						placeholder="Description: 0 of 1500 characters used"
						{...register('description', { required: true })}
					/>
					{errors.description && (
						<ErrorMessage>Item description is required</ErrorMessage>
					)}
				</InputItem>
				<InputItem>
					<InputTitle>
						Royalty Fee (%) <Asterisk />
					</InputTitle>
					<input
						type="number"
						placeholder="E.g. 2"
						{...register('royaltyFee', { required: true, min: 1, max: 100 })}
					/>
					{errors.royaltyFee && <ErrorMessage>Royalty Fee is required</ErrorMessage>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Supply <Asterisk />
					</InputTitle>
					<input
						type="number"
						placeholder="Min: 1 - Max: 999999999"
						{...register('amount', { required: true, min: 1, max: 999999999 })}
					/>
					{errors.amount && <ErrorMessage>Amount is required</ErrorMessage>}
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
