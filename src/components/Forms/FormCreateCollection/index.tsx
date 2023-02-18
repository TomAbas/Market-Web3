/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputImage, InputItem, InputTitle } from 'components/Mint/styled';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateCollection } from 'models/common';
import { Box, Typography } from '@mui/material';
import UploadMediaCustom from '../UploadMediaCustom';
import { FieldSubTitle, FieldTitleName } from './styled';
import { Asterisk, ErrorMessage } from '../Common/styled';
import AutoCompleteCustom from '../../CustomField/AutoCompleteCustom';
import { listCategory, Category } from '../../../constants/category.constant';
import { OptionSelectCustom } from '../../../models/common';
import { TextArea } from 'customComponents/FieldTextArea/styled';
interface Props {
	base64image: any;
	handleOpenModalBuy: any;
	updateFormInput: any;
	handleInputFile: any;
	collections: any;
}
const FormMint: React.FC<Props> = ({
	handleOpenModalBuy,
	updateFormInput,
	handleInputFile,
	base64image,
	collections,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<InputCreateCollection>();
	const handleDropFile = (e: any) => {
		handleInputFile(e);
		setValue('file', e[0]);
		clearErrors('file');
	};
	const [currentCategoryTransformed, setCurrentCategoryTransformed] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
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
		if (!errors.file && !errors.description && !errors.name) {
			handleOpenModalBuy();
		}
	});

	const listCategoryTransformed: OptionSelectCustom<string>[] = listCategory.map(
		(item: Category) => ({ name: item.name, value: item.value.toString() })
	);
	const checkCollectionNameValid = (e: any) => {
		let value = e.target.value;
		value = value.slice(0, 128);
		longName.current = value.length | 0;
		let isExist = collections.findIndex(
			(collection: any) => collection.collectionName === value
		);
		if (isExist >= 0) {
			setError('name', { type: 'required', message: 'Name is used' });
			return;
		} else if (value === '') {
			setError('name', { type: 'custom', message: 'Name is required' });
			return;
		}
		setValue('name', value);
		clearErrors('name');
	};
	const longName: any = useRef();
	const longDescription: any = useRef();
	const checkCollectionDesValid = (e: any) => {
		let value = e.target.value;
		value = value.slice(0, 1500);
		setValue('description', value);
		if (value.length > 1500) {
			setError('description', {
				type: 'custom',
				message: 'Description: 0 of 1500 characters used',
			});
		} else {
			clearErrors('description');
		}
		longDescription.current = value.length | 0;
	};
	const handleChangeCategory = (
		categoryTransformed: OptionSelectCustom<string> | null | undefined
	) => {
		if (categoryTransformed) {
			setValue('category', Number(categoryTransformed.value));
			setCurrentCategoryTransformed(categoryTransformed);
			clearErrors('category');
		} else {
			setValue('category', 0);
			setCurrentCategoryTransformed(undefined);
			setError('category', {
				type: 'custom',
				message: 'Category is required',
			});
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<FieldTitleName>
					Banner Image <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>
					This image will appear at the top of your collection page. Avoid including too
					much text in this banner image, as the dimensions change on different devices.
					1800 x 400 recommended.
				</FieldSubTitle>
				<InputImage sx={{ mt: 2 }}>
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
					<InputTitle sx={{ display: 'flex' }}>
						Name <Asterisk />
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
						placeholder="Example: Metaspacecy collection"
						{...register('name', { required: true })}
						onChange={checkCollectionNameValid}
					/>
					{errors.name && (
						<ErrorMessage>
							{errors.name.message ? errors.name.message : 'Name is required'}
						</ErrorMessage>
					)}
				</InputItem>
				<InputItem>
					<InputTitle sx={{ display: 'flex' }}>
						Description <Asterisk />
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
						placeholder="Provide a detailed description of your collection"
						{...register('description', {
							required: 'Description is required.',
							// maxLength: {
							// 	value: 15,
							// 	message: 'Description: 0 of 1500 characters used.',
							// },
						})}
						onChange={checkCollectionDesValid}
					/>
					{errors.description && (
						<ErrorMessage>{errors.description?.message}</ErrorMessage>
					)}
				</InputItem>

				<InputTitle sx={{ mt: 2 }}>
					Category
					<Asterisk />
				</InputTitle>

				<FieldSubTitle>
					A type of characteristics that the collection belongs to. Typically, artwork,
					sport, music, etc. In alpha release only artwork and its relative are supported.
				</FieldSubTitle>

				<AutoCompleteCustom
					currentItem={currentCategoryTransformed}
					listItem={listCategoryTransformed}
					{...register('category', {
						required: 'Category is required.',
					})}
					onChange={handleChangeCategory}
					placeholder="Category name..."
					sx={{
						border: '1px solid #E7E8EC',
						borderRadius: '12px',
					}}
				/>
				{errors.category?.message && (
					<ErrorMessage>{errors.category?.message}</ErrorMessage>
				)}

				<Box
					sx={{
						mt: 2,
						pointerEvents:
							errors.file || errors.description || errors.name ? 'none' : 'all',
						button: {
							padding: '10px 30px',
							border: '1.5px solid #e7e8ec',
							transition: 'all 0.4s',
							borderRadius: '12px',
							fontWeight: 500,
							background:
								errors.file || errors.description || errors.name
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

export default FormMint;

// errors.file && errors.description && errors.name ? handleOpenModalBuy : () => {};
