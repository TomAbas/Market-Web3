import { InputItem, InputTitle, InputImage } from 'components/Mint/styled';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateNFT } from 'models/common';
import { Box, Select, FormControl, MenuItem, Typography } from '@mui/material';
import UploadMediaCustom from '../UploadMediaCustom';
import { FieldSubTitle } from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';
import { TextArea } from 'customComponents/FieldTextArea/styled';

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
		clearErrors,
		setError,
		formState: { errors },
	} = useForm<InputCreateNFT>();
	const handleDropFile = (e: any) => {
		handleInputFileMintNft(e[0]);
		setValue('file', e[0]);
		clearErrors('file');
	};
	const onSubmit = handleSubmit((data) => {
		let newName = data.name.trim();
		if (newName.length === 0) {
			setError('name', {
				type: 'custom',
				message: 'Name: 0 of 128 characters used',
			});
			longName.current = newName.length;
			setValue('name', newName);
			return;
		}
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
	// const [long, setLong] = useState();
	const longDescription = useRef();
	const longName: any = useRef();
	const [collection, setCollection] = useState('');
	const checkCollectionDesValid = (e: any, long: number, name: any, ref: any) => {
		let value = e.target.value;
		value = value.slice(0, long);
		setValue(name, value);
		ref.current = value.length;
		if (value.length > 1500) {
			setValue(name, value.slice(0, 1499));
			setError(name, {
				type: 'custom',
				message: 'Description: 0 of 1500 characters used',
			});
		} else {
			clearErrors(name);
		}
	};

	const checkAmountValid = (e: any, amount: number, label: any, message: string) => {
		if (parseInt(e.target.value) > amount) {
			e.target.value = amount.toString();
			setValue(label, amount);
		} else {
			clearErrors(label);
		}
	};
	return (
		<>
			{' '}
			<form onSubmit={onSubmit}>
				<InputTitle>
					Image, Video, Audio, or 3D Model <Asterisk />
				</InputTitle>
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
							'video/*': ['.mp3', '.mp4', '.glb'],
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
									value={collection.collectionName}
									onClick={() => {
										setValue('collection', collection.collectionName);
										setValue('collectionId', collection._id);
										setCollection(collection.collectionName);
									}}
								>
									<em>{collection.collectionName}</em>
								</MenuItem>
							))}
						</Select>
						{errors.collection && (
							<ErrorMessage>Collection name is required</ErrorMessage>
						)}
					</FormControl>
				</InputItem>
				<InputItem>
					<InputTitle sx={{ display: 'flex' }}>
						Item Name <Asterisk />
						<Typography
							sx={{
								marginLeft: '10px',
								color: '#c4c4c4',
								fontSize: '12px',
								fontWeight: 'normal',
							}}
						>
							{longName?.current
								? `${longName?.current} of 128 characters used`
								: '0 of 128 characters used'}
						</Typography>
					</InputTitle>
					<input
						type="text"
						placeholder="Example: Metaspacecy item"
						{...register('name', { required: true })}
						onChange={(e) => {
							checkCollectionDesValid(e, 128, 'name', longName);
						}}
					/>
					{errors.name && <ErrorMessage>Item name is required</ErrorMessage>}
				</InputItem>
				<InputItem>
					<InputTitle sx={{ display: 'flex' }}>
						Item Description <Asterisk />{' '}
						<Typography
							sx={{
								marginLeft: '10px',
								color: '#c4c4c4',
								fontSize: '12px',
								fontWeight: 'normal',
							}}
						>
							{longDescription?.current
								? `${longDescription?.current} of 1500 characters used`
								: '0 of 1500 characters used'}
						</Typography>
					</InputTitle>

					<TextArea
						rows={6}
						cols={4}
						placeholder="Provide a detailed description of your item"
						{...register('description', {
							required: 'Item description is required',
						})}
						onChange={(e) => {
							checkCollectionDesValid(e, 1500, 'description', longDescription);
						}}
					/>
					{errors.description && (
						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					)}
				</InputItem>
				<InputItem>
					<InputTitle>
						Royalty Fee (%) <Asterisk />
					</InputTitle>
					<input
						min="0"
						onInput={(e: any) => (e.target.value = Math.abs(e.target.value))}
						type="number"
						placeholder="Maximum is 50%"
						{...register('royaltyFee', {
							required: 'Royalty fee is required',
							max: {
								value: 50,
								message: 'Royalty fee must be less than or equal 50%',
							},
							min: {
								value: 0,
								message: 'Royalty must be positive',
							},
						})}
						onChange={(e: any) => {
							checkAmountValid(
								e,
								50,
								'royaltyFee',
								'Royalty fee must be less than or equal 50%'
							);
						}}
					/>
					{errors.royaltyFee && <ErrorMessage>{errors.royaltyFee?.message}</ErrorMessage>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Supply <Asterisk />
					</InputTitle>
					<input
						min="0"
						onInput={(e: any) => (e.target.value = Math.abs(e.target.value))}
						type="number"
						placeholder="Maximum is 100"
						{...register('amount', {
							required: 'Amount  is required',
							max: {
								value: 100,
								message: 'Amount must less than or equal 100',
							},
							min: {
								value: 1,
								message: 'Amount must be greater than 1',
							},
						})}
						onChange={(e: any) => {
							checkAmountValid(
								e,
								100,
								'amount',
								'Supply must be less than or equal 100'
							);
						}}
					/>
					{errors.amount && <ErrorMessage>{errors.amount?.message}</ErrorMessage>}
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
