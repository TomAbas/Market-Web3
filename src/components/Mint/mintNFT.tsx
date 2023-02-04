/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import { InputItem, InputTitle } from './styled';
import useControlModal from 'hooks/useControlModal';
import ModalBuy from 'components/ModalBuy/ModalBuy';
import useCreateMintSell from 'hooks/useCreateMint';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormMintNft from 'components/Forms/FormMintNFT';
import { getListCollectionUserResource } from '../../utils/dataResource';
import { getCollectionByUserAddress } from '../../api/collections/collectionApi';
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
			label: 'Create your item',
			description: 'Please confirm your transaction',
		},
		{
			label: `${
				statusBuyNft.isSuccess
					? 'Congrats'
					: statusBuyNft.isError
					? 'Something went wrong'
					: 'Result'
			}`,
			description: `${
				statusBuyNft.isSuccess
					? 'Successfully created an item'
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
				const listCollection = await getCollectionByUserAddress(
					account?.address?.toString()
				).then((res) => res.data);
				setCollections(listCollection);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const handleNavigate = (status: boolean) => {
		if (status) {
			navigate(
				`/my-item?creator=${encodeURIComponent(
					userAddress
				)}&collection=${encodeURIComponent(
					dataFormInput?.collection
				)}&name=${encodeURIComponent(dataFormInput?.name)}`
			);
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
			<FormMintNft
				base64image={base64image}
				handleOpenModalBuy={handleOpenModalBuy}
				updateFormInput={setFormInputNFT}
				handleInputFileMintNft={handleInputFileMintNft}
				collections={collections}
				setDataFormInput={setDataFormInput}
			/>
			<ModalBuy
				title="Create NFT"
				steps={steps}
				openState={openModalBuy}
				closeModal={() => {
					handleCloseModalBuy(handleNavigate(statusBuyNft.isSuccess));
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
