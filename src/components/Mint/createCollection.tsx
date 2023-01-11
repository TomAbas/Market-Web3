/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useControlModal from 'hooks/useControlModal';
import useCreateMintSell from 'hooks/useCreateMintSell';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import React, { useState, useEffect } from 'react';
import { getListCollectionUserResource } from '../../utils/dataResource';
import FormMint from 'components/Forms/FormCreateCollection';
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
	const { handleInputFile, createCollection, base64image, updateFormInput } = useCreateMintSell();
	const steps = [
		{
			label: 'Create your collection',
			description: 'Please confirm your action',
		},
		{
			label: `Finish`,
			description: `${
				statusBuyNft.isSuccess
					? 'You create your collection'
					: statusBuyNft.isError && 'Try again'
			}`,
		},
	];
	const { account } = useWallet();
	const [collections, setCollections] = useState<any[]>([]);
	const fetchCollection = async () => {
		if (account?.address) {
			try {
				const newCollections = await getListCollectionUserResource(
					account?.address?.toString()
				);
				setCollections(newCollections);
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		fetchCollection();
	}, [account]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<FormMint
				base64image={base64image}
				handleOpenModalBuy={handleOpenModalBuy}
				updateFormInput={updateFormInput}
				handleInputFile={handleInputFile}
				collections={collections}
			/>
			<RedBar />
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

{
	/* Category */
}
{
	/* <InputItem>
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
			</InputItem> */
}
