import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import item from '../../assets/images/card/box.webp';
import { ItemImage } from 'components/Marketplace/styled';

export default function MyCollection() {
	const { account } = useWallet();
	const { tokens } = useTokens(account);
	const [collections, setCollections] = useState<any[]>([]);
	useEffect(() => {
		let newCollection = new Map();
		tokens.map((item) => {
			let collection = newCollection.get(item?.collection + '/////' + item?.creator);
			if (!collection) {
				newCollection.set(item?.collection + '/////' + item?.creator, [item]);
			} else {
				collection.push(item);
				newCollection.set(item?.collection + '/////' + item?.creator, collection);
			}
		});
		setCollections(Array.from(newCollection));
	}, [tokens]);
	console.log(collections);
	return (
		<>
			<Box sx={{ maxWidth: '1350px', mx: 'auto', pt: 16, pb: 4 }}>
				<Box sx={{ textAlign: 'center', mb: 4 }}>
					<Typography variant="h2" fontWeight={500}>
						My Collections
					</Typography>
				</Box>
				<Grid container spacing={1}>
					{' '}
					{collections.map((collection, index) => (
						<Grid xs={6} sm={4} md={3} p={1} key={index}>
							<Box
								sx={{
									border: '1.5px solid #e7e8ec',
									borderRadius: '12px',
									overflow: 'hidden',
									cursor: 'pointer',
									transition: 'all 0.4s',
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
								<Box p={1.5}>
									<Typography variant="h6">
										{collection[0].split('/////')[0]}
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
														collection[0].split('/////')[1]
													}`}
													target="_blank"
												>
													{collection[0].split('/////')[1].slice(0, 6) +
														'...' +
														collection[0]
															.split('/////')[1]
															.slice(
																collection[0].split('/////')[1]
																	.length - 4,
																collection[0].split('/////')[1]
																	.length
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
				</Grid>
			</Box>
		</>
	);
}
