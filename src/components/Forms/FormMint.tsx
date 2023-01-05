import { InputImage, InputItem, InputTitle } from 'components/Mint/styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputCreateCollection } from 'models/common';
import { Box } from '@mui/material';

interface Props {
	handleOpenModalBuy: any;
	updateFormInput: any;
	handleInputFile: any;
}
const FormMint: React.FC<Props> = ({ handleOpenModalBuy, updateFormInput, handleInputFile }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputCreateCollection>();
	const onSubmit = handleSubmit((data) => {
		console.log(data);
		updateFormInput(data);
		handleOpenModalBuy();
	});
	return (
		<>
			{' '}
			<form onSubmit={onSubmit}>
				<InputImage>
					<input
						type="file"
						className="my-4"
						{...register('file', { required: true })}
						onChange={handleInputFile}
					/>
					{errors.file && <p>Image is required</p>}
				</InputImage>

				<InputItem>
					<InputTitle>
						Name<span>*</span>
					</InputTitle>
					<input
						type="text"
						placeholder="Collection Name"
						{...register('name', { required: true })}
					/>
					{errors.name && <p>Name is required</p>}
				</InputItem>
				<InputItem>
					<InputTitle>
						Description<span>*</span>
					</InputTitle>
					<input
						type="text"
						placeholder="Description"
						{...register('description', { required: true })}
					/>
					{errors.description && <p>Description is required</p>}
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

export default FormMint;
