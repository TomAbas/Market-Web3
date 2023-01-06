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
import axios from 'axios';

const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL;
const MARKET_ADDRESS = process.env.REACT_APP_MARKET_ADDRESS;
const MARKET_RESOURCE_ADDRESS = process.env.REACT_APP_MARKET_RESOURCE_ADDRESS;

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
	const { createItem, setFormInputNFT, formInputNFT, handleInputFileMintNft, base64image } =
		useCreateMintSell();
	const steps = [
		{
			label: 'Confirm order',
			description: 'Please confirm your order',
		},
		{
			label: `${
				statusBuyNft.isSuccess ? 'Congrat' : statusBuyNft.isError && 'Something went wrong'
			}`,
			description: `${
				statusBuyNft.isSuccess ? 'You create your nft' : statusBuyNft.isError && 'Try again'
			}`,
		},
	];
	const { account } = useWallet();

	const [collections, setCollections] = useState<any[]>([]);
	useEffect(() => {
		try {
			const fetchCollection = async () => {
				const response: any = await axios.get(
					`${APTOS_NODE_URL}/accounts/${account?.address}/resource/${MARKET_ADDRESS}::nft::CollectionInfo`
				);
				const newCollections = response.data.data?.collection_list;
				setCollections(newCollections);
			};
			fetchCollection();
		} catch (error) {}
	}, [account]);
	console.log(collections);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* <input type="file" name="Asset" className="my-4" onChange={handleInputFileMintNft} /> */}
			{base64image && (
				<img alt="item image" className="rounded mt-4" width="350" src={base64image} />
			)}
			<FormMintNft
				handleOpenModalBuy={handleOpenModalBuy}
				updateFormInput={setFormInputNFT}
				handleInputFileMintNft={handleInputFileMintNft}
				collections={collections}
			/>
			{/* <InputItem>
				<InputTitle>Collection name</InputTitle>
				<input
					type="text"
					placeholder="Collection Name"
					onChange={(e) =>
						setFormInputNFT({ ...formInputNFT, collection: e.target.value })
					}
				/>
			</InputItem>
			<InputItem>
				<InputTitle>Item name</InputTitle>
				<input
					type="text"
					placeholder="Item name"
					onChange={(e) => setFormInputNFT({ ...formInputNFT, name: e.target.value })}
				/>
			</InputItem>
			<InputItem>
				<InputTitle>Item Description</InputTitle>
				<input
					type="text"
					placeholder="Provide a detailed description of your item."
					onChange={(e) =>
						setFormInputNFT({ ...formInputNFT, description: e.target.value })
					}
				/>
			</InputItem> */}

			{/* <InputItem>
				<InputTitle>Royalty Fee (%)</InputTitle>
				<input
					type="text"
					placeholder="1"
					onChange={(e) =>
						setFormInputNFT({ ...formInputNFT, royaltyFee: parseInt(e.target.value) })
					}
				/>
			</InputItem>
			<InputItem>
				<InputTitle>Supply</InputTitle>
				<input
					type="text"
					placeholder="1"
					onChange={(e) =>
						setFormInputNFT({ ...formInputNFT, amount: parseInt(e.target.value) })
					}
				/>
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
			</Box> */}
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
