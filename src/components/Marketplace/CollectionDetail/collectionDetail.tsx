/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFT from 'components/Marketplace/CardNFT';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokens } from '../../../hooks/useTokens';
import { getListItemResource } from '../../../utils/dataResource';
import banner from '../../../assets/banner.png';
import aptos from '../../../assets/images/card/aptos.jpg';
import { useSearchParams } from 'react-router-dom';
const CollectionDetail = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	const [items, setItems] = useState<any[]>([]);
	const search = useLocation().search;
	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	console.log({ collection, creator });
	useEffect(() => {
		const fetchOffers = async () => {
			const newOffers = await getListItemResource();
			console.log(newOffers);
			let newItems = newOffers.filter(
				(item: any) =>
					item?.token_id?.token_data_id?.collection == collection &&
					item?.token_id?.token_data_id?.creator == creator
			);
			setItems(newItems);
		};
		fetchOffers();
	}, []);
	// console.log(tokens);
	return (
		<>
			<Box pt={13}>
				<Box
					sx={{
						position: 'relative',
						img: {
							width: '100%',
							objectFit: 'cover',
							objectPosition: 'center',
							height: '300px',
						},
					}}
				>
					<img src={banner} alt="banner" />
					<Box
						sx={{
							position: 'absolute',
							left: '50%',
							bottom: '-50px',
							transform: 'translateX(-50%)',
							border: '2px solid #fff',
							borderRadius: '10px',
							img: {
								width: '100px',
								height: '100px',
								objectFit: 'cover',
								objectPosition: 'center',
								borderRadius: '10px',
							},
						}}
					>
						<img src={banner} alt="avatar" />
					</Box>
				</Box>
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							{collection}
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							gap={1}
							sx={{
								background: '#fff',
								padding: '8px 32px',
								width: 'fit-content',
								mx: 'auto',
								mt: 2,
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
								img: {
									width: '24px',
								},
							}}
						>
							<img src={aptos} alt="aptos" />
							<Box>
								{creator?.slice(0, 6) +
									'...' +
									creator?.slice(creator?.length - 4, creator?.length)}
							</Box>
						</Stack>
					</Box>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{items.map((item: any, index: any) => (
								<CardNFT
									offers={items}
									offer={item}
									setOffers={setItems}
									index={index}
									key={index}
								/>
							))}
						</Grid>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CollectionDetail;
