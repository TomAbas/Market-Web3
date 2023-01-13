/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import item from '../../assets/avatar_default.png';
import { ItemImage } from 'components/Marketplace/styled';
import ButtonWhite from 'customComponents/ButtonWhite/ButtonWhite';
import { Outlet, useNavigate } from 'react-router-dom';
import SkeletonCardNft from 'components/SkeletonCardNft';
export default function MyCollection() {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const navigate = useNavigate();
	const { account } = useWallet();
	const { tokens } = useTokens(account);
	const [collections, setCollections] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let newCollection = new Map();
		tokens.map((item) => {
			let collection = newCollection.get(item?.collection + '*/////*' + item?.creator);
			if (!collection) {
				newCollection.set(item?.collection + '*/////*' + item?.creator, [item]);
			} else {
				collection.push(item);
				newCollection.set(item?.collection + '*/////*' + item?.creator, collection);
			}
		});
		setCollections(Array.from(newCollection));
		if (tokens.length > 0) {
			setLoading(false);
		}
	}, [tokens]);
	// console.log(collections);
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
						<Box sx={{ width: '230px' }}>
							<ButtonWhite
								sx={{ height: '100%', mb: 0 }}
								onClick={() => navigate(`/mint?query=1`)}
							>
								<span>Create a collection</span>
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
										navigate(
											`/myCollection/detail?collection=${
												collection[0].split('*/////*')[0]
											}&creator=${collection[0].split('*/////*')[1]}`
										);
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
												<img src={collection[1][0].uri} alt="collection" />
											</Box>
										</ItemImage>
										<Box py={1.5}>
											<Typography variant="h6">
												{collection[0].split('*/////*')[0]}
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
															href={`https://explorer.aptoslabs.com/account/${
																collection[0].split('*/////*')[1]
															}`}
															target="_blank"
														>
															{collection[0]
																.split('*/////*')[1]
																.slice(0, 6) +
																'...' +
																collection[0]
																	.split('*/////*')[1]
																	.slice(
																		collection[0].split(
																			'*/////*'
																		)[1].length - 4,
																		collection[0].split(
																			'*/////*'
																		)[1].length
																	)}
														</a>
													</Typography>
												</Stack>
												<Box>
													<Typography variant="body1">
														{collection[1].length} items
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
		</>
	);
}
