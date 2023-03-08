/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputImage, InputItem, InputTitle } from 'components/Mint/styled';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TextArea } from 'customComponents/FieldTextArea/styled';
import UploadMediaCustom from 'components/Forms/UploadMediaCustom';
import { Asterisk, ErrorMessage } from 'components/Forms/Common/styled';
import { FieldSubTitle, FieldTitleName } from 'components/Forms/FormCreateCollection/styled';
import DateTimeCustomPicker from 'customComponents/DateTimePickerCustom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export interface IFormSellItemInputs {
	startTime: number;
	endTime: number;
}

const CreatPrediction = () => {
	const [amountOwned, setAmountOwned] = useState<string>('0');
	const schema = yup
		.object({
			price: yup.number().required('Required').min(0).typeError('You must specify a number'),
			currentPaymentToken: yup.object().required('Required'),
			quantity: yup
				.number()
				.required('Required')
				.min(1)
				.max(Number(amountOwned), 'max')
				.typeError('You must specify a number'),
			startTime: yup
				.number()
				.required('Required')
				.min(new Date().getTime(), 'Must be in future')
				.typeError('Must be in future'),
			endTime: yup.number().required('Required'),
		})
		.required();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm<IFormSellItemInputs>({
		resolver: yupResolver(schema),
	});
	return (
		<Box sx={{ maxWidth: '940px', mx: 'auto', paddingTop: '150px' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<form>
					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Set Market Question <Asterisk />
							<Typography
								sx={{
									marginLeft: '10px',
									color: '#c4c4c4',
									fontSize: '12px',
									fontWeight: 'normal',
								}}
							></Typography>
						</InputTitle>
						<input type="text" placeholder="Will GPT-4 have 500b+ parameters?" />
					</InputItem>
					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Description <Asterisk />
							{/* <Typography
								sx={{
									marginLeft: '10px',
									color: '#c4c4c4',
									fontSize: '12px',
									fontWeight: 'normal',
								}}
							></Typography> */}
						</InputTitle>
						{/* <input
							type="text"
							placeholder="This market will resolve to “Yes”if OpenAI's GPT-4 has 500 billion or more..."
						/> */}
					</InputItem>
					<InputImage sx={{ mt: 2 }}>
						{/* <InputTitle>
						Image<span>*</span>
					</InputTitle> */}
						<UploadMediaCustom
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
						/>
					</InputImage>
					<ErrorMessage>Image is required</ErrorMessage>

					<InputItem>
						<InputTitle sx={{ display: 'flex' }}>
							Option <Asterisk />
							<Typography
								sx={{
									marginLeft: '10px',
									color: '#c4c4c4',
									fontSize: '12px',
									fontWeight: 'normal',
								}}
							></Typography>
							<Typography
								sx={{
									marginLeft: '10px',
									color: '#c4c4c4',
									fontSize: '12px',
									fontWeight: 'normal',
								}}
							></Typography>
							<Typography
								sx={{
									marginLeft: '10px',
									color: '#c4c4c4',
									fontSize: '12px',
									fontWeight: 'normal',
								}}
							></Typography>
						</InputTitle>
						<input type="text" placeholder="option 1" />
						<input type="text" placeholder="option 2" />
						<input type="text" placeholder="option 3" />
					</InputItem>
					<AddIcon></AddIcon>
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
					<Box
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
					>
						Create
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default CreatPrediction;
