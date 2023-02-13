/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import item from '../../assets/avatar_default.png';
import { ItemImage } from 'components/Marketplace/styled';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
import { getCollectionByUserAddress } from '../../api/collections/collectionApi';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { useNavigate } from 'react-router-dom';
import SkeletonCardNft from 'components/SkeletonCardNft';
import { Collection } from 'models/collection';
import { displayAddress } from 'utils/formatDisplay';
import ImportCollection from './ImportCollection';
export default function MyCollection() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const navigate = useNavigate();
	const [collections, setCollections] = useState<Collection[]>([]);
	const [loading, setLoading] = useState(true);
	const [trigger, setTrigger] = useState(false);
	const [openModalImport, setOpenModalImport] = useState(false);
	const userInfo = useAppSelector(selectUser);
	useEffect(() => {
		if (!userInfo?.userAddress) return;
		async function fetchCollection() {
			getCollectionByUserAddress(userInfo?.userAddress!, 2).then((res) => {
				setCollections(res.data);
				setLoading(false);
			});
		}
		fetchCollection();
	}, [userInfo, trigger]);

	return (
		<>
			<Box sx={{ maxWidth: '1350px', mx: 'auto', pt: 16, pb: 4 }}>
				<Box sx={{ textAlign: 'left', mb: 4 }}>
					<Typography variant="h2" fontWeight={500}>
						My Collections
					</Typography>
					<Typography variant="body1">
						Create, curate, and manage collections of unique NFTs to share and sell.
					</Typography>
					<Stack
						direction="row"
						alignItems="stretch"
						sx={{ width: '100%', marginTop: '20px' }}
						spacing={2}
					>
						<Box sx={{ width: '240px' }}>
							<ButtonWhite
								sx={{ height: '100%', mb: 0 }}
								onClick={() => navigate(`/mint?query=1`)}
							>
								<span>Create A Collection</span>
							</ButtonWhite>
						</Box>
						<Box sx={{ width: '250px' }}>
							<ButtonWhite
								sx={{ height: '100%', mb: 0 }}
								onClick={() => setOpenModalImport(true)}
							>
								<span>Import A Collection</span>
							</ButtonWhite>
						</Box>
					</Stack>
				</Box>

				<Grid container spacing={1}>
					{' '}
					{loading ? (
						<>
							{arr.map((item, idx) => (
								<SkeletonCardNft key={idx} />
							))}
						</>
					) : (
						<>
							{collections.map((collection, index) => (
								<Grid
									xs={6}
									sm={4}
									md={3}
									p={1}
									key={index}
									onClick={() => {
										navigate(`/collection-detail/${collection._id}`);
									}}
								>
									<Box
										sx={{
											border: '1.5px solid #e7e8ec',
											borderRadius: '12px',
											overflow: 'hidden',
											cursor: 'pointer',
											transition: 'all 0.4s',
											padding: '12px 12px 0',
											background: '#fff',
											'&:hover': {
												boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
											},
										}}
									>
										<ItemImage>
											<Box className="main-img">
												<img src={collection.logo} alt="collection" />
											</Box>
										</ItemImage>
										<Box py={1.5}>
											<Typography variant="h6">
												{collection.collectionName}
											</Typography>
											<Stack
												mt={1}
												direction="row"
												alignItems="center"
												justifyContent="space-between"
												gap={1}
											>
												<Stack direction="row" gap={1} alignItems="center">
													<Box
														sx={{
															img: {
																width: '32px',
																height: '32px',
																objectFit: 'cover',
																objectPosition: 'center',
																borderRadius: '50%',
															},
														}}
													>
														<img src={item} alt="collection" />
													</Box>
													<Typography variant="body1">
														<a
															href={`/#/profile?address=${collection.userAddress}`}
														>
															{displayAddress(collection.userAddress)}
														</a>
													</Typography>
												</Stack>
												<Box>
													<Typography variant="body1">
														{collection.listItem.length}{' '}
														{collection.listItem.length > 1
															? 'items'
															: 'item'}
													</Typography>
												</Box>
											</Stack>
										</Box>
									</Box>
								</Grid>
							))}
						</>
					)}
				</Grid>
			</Box>
			<ImportCollection
				open={openModalImport}
				onClose={() => setOpenModalImport(false)}
				setTrigger={setTrigger}
			/>
		</>
	);
}
