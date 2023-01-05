/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useControlModal from 'hooks/useControlModal';
import useCreateMintSell from 'hooks/useCreateMintSell';
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
	const {
		handleNext,
		handleOpenModalBuy,
		handleCloseModalBuy,
		startLoading,
		completeTaskSuccess,
		failToComplete,
		openModalBuy,
		activeStep,
		statusBuyNft,
	} = useControlModal();
	const { handleInputFile, createCollection, base64image, updateFormInput, formInput } =
		useCreateMintSell();
	const steps = [
		{
			label: 'Create your collection',
			description: 'Please confirm your action',
		},
		{
			label: `${
				statusBuyNft.isSuccess ? 'Congrat' : statusBuyNft.isError && 'Something went wrong'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'You create your collection'
					: statusBuyNft.isError && 'Try again'
			}`,
		},
	];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				// '& .MuiTextField-root': { width: '25ch' },
			}}
		>
			<input type="file" name="Asset" className="my-4" onChange={handleInputFile} />
			<InputItem>
				<InputTitle>Name</InputTitle>
				<input
					type="text"
					placeholder="Collection Name"
					onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
				/>
			</InputItem>
			<InputItem>
				<InputTitle>Description</InputTitle>
				<input
					type="text"
					placeholder="Description"
					onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
				/>
			</InputItem>
			{/* Category */}
			{/* <InputItem>
				<InputTitle>Category</InputTitle>
				<FormControl sx={{ minWidth: 120, width: '100%' }}>
					<Select
						value={age}
						onChange={handleChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="">
							<em>Category Name</em>
						</MenuItem>
						<MenuItem value={10}>Other</MenuItem>
						<MenuItem value={20}>Art</MenuItem>
						<MenuItem value={30}>Sport</MenuItem>
					</Select>
				</FormControl>
			</InputItem> */}
			{base64image && <img className="rounded mt-4" width="350" src={base64image} />}
			<RedBar />
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
			<ModalBuy
				steps={steps}
				openState={openModalBuy}
				closeModal={handleCloseModalBuy}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				funcBuyNft={() =>
					createCollection(startLoading, completeTaskSuccess, handleNext, failToComplete)
				}
			/>
		</Box>
	);
}
