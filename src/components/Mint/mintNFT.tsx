/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import useControlModal from 'hooks/useControlModal';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useCreateMintSell from 'hooks/useCreateMintSell';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import React, { useState, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { walletClient } from '../../utils/aptos';
import FormMintNft from 'components/Forms/FormMintNft';
import { getListCollectionResource } from '../../utils/dataResource';

export default function LayoutMintNFT() {
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
	const { createItem, setFormInputNFT, handleInputFileMintNft, base64image } =
		useCreateMintSell();
	const steps = [
		{
			label: 'Confirm order',
			description: 'Please confirm your order',
		},
		{
			label: `Finish`,
			description: `${
				statusBuyNft.isSuccess ? 'You create your nft' : statusBuyNft.isError && 'Try again'
			}`,
		},
	];
	const { account } = useWallet();

	const [collections, setCollections] = useState<any[]>([]);
	const fetchCollection = async () => {
		if (account?.address) {
			try {
				const newCollections = await getListCollectionResource(
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
	console.log(collections);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<FormMintNft
				base64image={base64image}
				handleOpenModalBuy={handleOpenModalBuy}
				updateFormInput={setFormInputNFT}
				handleInputFileMintNft={handleInputFileMintNft}
				collections={collections}
			/>
			<ModalBuy
				steps={steps}
				openState={openModalBuy}
				closeModal={handleCloseModalBuy}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				funcBuyNft={() =>
					createItem(startLoading, completeTaskSuccess, handleNext, failToComplete)
				}
			/>
		</Box>
	);
}
