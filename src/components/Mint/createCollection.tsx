/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useControlModal from 'hooks/useControlModal';
import useCreateMintSell from 'hooks/useCreateMint';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import React, { useState, useEffect } from 'react';
import { getListCollectionUserResource } from '../../utils/dataResource';
import FormMint from 'components/Forms/FormCreateCollection';
import { getCollectionByUserAddress } from 'api/collections/collectionApi';
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
interface Props {
	setValue: any;
	handleCreateItem: any;
}
const LayoutCreateCollection: React.FC<Props> = ({ setValue, handleCreateItem }) => {
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
			label: 'Create Your Collection',
			description: 'Please confirm your transaction',
		},
		{
			label: `${
				statusBuyNft.isSuccess
					? 'Congrats'
					: statusBuyNft.isError
					? 'Something Went Wrong'
					: 'Result'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'Successfully created a collection'
					: statusBuyNft.isError
					? 'Try again'
					: '123'
			}`,
		},
	];
	const { account } = useWallet();
	const [collections, setCollections] = useState<any[]>([]);
	const fetchCollection = async () => {
		if (account?.address) {
			try {
				getCollectionByUserAddress(account?.address?.toString(), 2).then((res) => {
					setCollections(res.data);
				});
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
				title="Create Collection"
				steps={steps}
				openState={openModalBuy}
				closeModal={() => handleCloseModalBuy(handleCreateItem(statusBuyNft.isSuccess))}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				funcBuyNft={() =>
					createCollection(startLoading, completeTaskSuccess, handleNext, failToComplete)
				}
			/>
		</Box>
	);
};

export default LayoutCreateCollection;
