/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import useControlModal from 'hooks/useControlModal';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useCreateMintSell from 'hooks/useCreateMintSell';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormMintNft from 'components/Forms/FormMintNFT';
import { getListCollectionUserResource } from '../../utils/dataResource';

export default function LayoutMintNFT() {
	const navigate = useNavigate();
	const [dataFormInput, setDataFormInput] = useState<any>();
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
			label: `${
				statusBuyNft.isSuccess
					? 'Congrat'
					: statusBuyNft.isError
					? 'Something went wrong'
					: 'Result'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'You create your NFT'
					: statusBuyNft.isError
					? 'Try again'
					: '123'
			}`,
		},
	];
	const { account } = useWallet();
	const userAddress = account?.address?.toString() || '';

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
				setDataFormInput={setDataFormInput}
			/>
			<ModalBuy
				steps={steps}
				openState={openModalBuy}
				closeModal={() => {
					handleCloseModalBuy(
						navigate(
							`/my-item?creator=${encodeURIComponent(
								userAddress
							)}&collection=${encodeURIComponent(
								dataFormInput?.collection
							)}&name=${encodeURIComponent(dataFormInput?.name)}`
						)
					);
				}}
				activeStep={activeStep}
				statusBuyNft={statusBuyNft}
				funcBuyNft={() =>
					createItem(startLoading, completeTaskSuccess, handleNext, failToComplete)
				}
			/>
		</Box>
	);
}
