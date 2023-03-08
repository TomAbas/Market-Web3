/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputImage, InputItem, InputTitle } from 'components/Mint/styled';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage1 } from 'config/firebase1';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadMediaCustom from 'components/Forms/UploadMediaCustom';
import { Asterisk, ErrorMessage } from 'components/Forms/Common/styled';
import { FieldSubTitle, FieldTitleName } from 'components/Forms/FormCreateCollection/styled';
import DateTimeCustomPicker from 'customComponents/DateTimePickerCustom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoCompleteCustom from '../../CustomField/AutoCompleteCustom';
import { OptionSelectCustom } from 'models/common';
import { listCategoryPrediction, Category } from '../../../constants/category.constant';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
export interface InputCreatePrediction {
	file: any;
	startTime: number;
	endTime: number;
	question: string;
	options: string[];
	category: string;
}

const CreatPrediction = () => {
	const [image, setImage] = useState<any>(null);
	const [amountOwned, setAmountOwned] = useState<string>('0');
	const [amountOptions, setAmountOptions] = useState<number>(2);
	const [currentCategoryTransformed, setCurrentCategoryTransformed] = useState<
		OptionSelectCustom<string> | null | undefined
	>();
	//function
	const listCategoryTransformed: OptionSelectCustom<string>[] = listCategoryPrediction.map(
		(item: Category) => ({ name: item.name, value: item.value.toString() })
	);

	const handleDropFile = (e: any) => {
		const file = e[0];
		if (file) {
			// const file = e[0];
			setImage({ ...file, preview: URL.createObjectURL(file) });
		}
		setValue('file', e[0]);
		clearErrors('file');
	};
	const handleChangeCategory = (
		categoryTransformed: OptionSelectCustom<string> | null | undefined
	) => {
		if (categoryTransformed) {
			setValue('category', categoryTransformed.name);
			setCurrentCategoryTransformed(categoryTransformed);
			clearErrors('category');
		} else {
			setValue('category', 'Art');
			setCurrentCategoryTransformed(undefined);
			setError('category', {
				type: 'custom',
				message: 'Category is required',
			});
		}
	};
	//schema
	const schema = yup
		.object({
			startTime: yup
				.number()
				.required('Required')
				.min(new Date().getTime(), 'Must be in future')
				.typeError('Must be in future'),
			endTime: yup.number().required('Required'),
			question: yup.string().required('Required'),
			file: yup.mixed().required('Required'),
			options: yup.array().of(yup.string()).required('Required'),
			category: yup.string().required('Required'),
		})
		.required();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<InputCreatePrediction>({
		resolver: yupResolver(schema),
		defaultValues: { options: ['yes', 'no'] },
	});
	function onHandleSubmit(data: any) {
		console.log(data);
		const sotrageRef = ref(storage1, `item/${data.file.name}`);
		const uploadTask = uploadBytesResumable(sotrageRef, data.file);
		uploadTask.on(
			'state_changed',
			() => {},
			(error) => console.log('err ', error),
			async () => {
				let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				try {
					console.log('downloadURL', downloadURL);
				} catch (error: any) {
					console.log('Error creating item NFT: ', error);
				}
			}
		);
	}
	useEffect(() => {
		setValue('startTime', new Date(new Date().getTime()).getTime());
		setValue(
			'endTime',
			new Date(new Date().getTime() + 7 * 24 * 60 * 60000 + 5 * 60000).getTime()
		);
	}, []);
	useEffect(() => {
		console.log(errors);
	}, [errors]);
	return (
		<Box sx={{ maxWidth: '940px', mx: 'auto', paddingTop: '150px' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<form onSubmit={handleSubmit(onHandleSubmit)}>
					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Set Market Question <Asterisk />
						</InputTitle>
						<input
							type="text"
							placeholder="Will GPT-4 have 500b+ parameters?"
							{...register('question')}
						/>
					</InputItem>
					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Image <Asterisk />
						</InputTitle>
					</InputItem>
					<InputImage sx={{ mt: 2 }}>
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
								'image/*': [
									'.png',
									'.gif',
									'.jpeg',
									'.jpg',
									'.mp3',
									'.mp4',
									'.glb',
								],
								'video/*': ['.mp3', '.mp4', '.glb'],
							}}
							file={image}
							maxSize={10485760}
							error={Boolean(errors.file)}
							{...register(`file`, { required: true })}
						/>
					</InputImage>
					{errors.file?.message && (
						<ErrorMessage>
							<>{errors.file?.message}</>
						</ErrorMessage>
					)}

					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Option <Asterisk />
						</InputTitle>
						{new Array(amountOptions).fill(0).map((_, index) => {
							return (
								<input
									key={index}
									type="text"
									placeholder={`option ${index}`}
									style={{ marginBottom: '10px' }}
									onChange={(e) => {
										const options = getValues('options');
										options[index] = e.target.value;
										setValue('options', options);
										console.log(options);
										clearErrors('options');
									}}
								/>
							);
						})}
					</InputItem>
					<AddIcon
						onClick={() => {
							setAmountOptions((prev) => prev + 1);
						}}
					/>
					<DateTimeCustomPicker setValue={setValue} />
					<InputTitle sx={{ mt: 2 }}>
						Category
						<Asterisk />
					</InputTitle>

					<FieldSubTitle>
						A type of characteristics that the collection belongs to. Typically,
						artwork, sport, music, etc. In alpha release only artwork and its relative
						are supported.
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
					<ButtonWhite
						sx={{
							marginLeft: '760px',
							textAlign: 'center',
							padding: '10px 30px',
							border: '1.5px solid #e7e8ec',
							transition: 'all 0.4s',
							borderRadius: '12px',
							fontWeight: 500,
							color: 'black',
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
						}}
						type="submit"
					>
						Create
					</ButtonWhite>
				</form>
			</Box>
		</Box>
	);
};

export default CreatPrediction;
