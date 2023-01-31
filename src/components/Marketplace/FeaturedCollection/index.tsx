import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { ItemImage } from './styled';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import SkeletonCardNft from 'components/SkeletonCardNft';

interface Props {
	collections: any[];
	isLoading: boolean;
}
const FeaturedCollection: React.FC<Props> = ({ collections, isLoading }) => {
	let arr = new Array(4);
	let navigate = useNavigate();
	function handleCollectionDetail(creator: string, collection: string) {
		navigate(
			`/collection-detail?creator=${encodeURIComponent(
				creator
			)}&collection=${encodeURIComponent(collection)}`
		);
	}

	return (
		<>
			{' '}
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<Typography variant="h2" fontWeight={500}>
					Featured Collections
				</Typography>
			</Box>
			<Grid container spacing={1}>
				{isLoading ? (
					<>
						{arr.map((item, idx) => (
							<SkeletonCardNft key={idx} />
						))}
					</>
				) : (
					<>
						{collections.map((collection: any, index: any) => (
							<Grid
								xs={6}
								sm={4}
								md={3}
								p={1}
								key={index}
								onClick={() => {
									handleCollectionDetail(
										collection.useAddress,
										collection.collectionName
									);
								}}
							>
								<Link
									// href={`https://explorer.aptoslabs.com/account/${
									// 	collection[0].split('*/////*')[1]
									// }`}
									target="_blank"
									sx={{
										textDecoration: 'none',
										color: '#131740',
										'&:hover': {
											boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
										},
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
														<img
															src={collection.ownerInfo.avatar}
															alt="collection"
														/>
													</Box>
													<Typography variant="body1">
														{collection.userAddress.slice(0, 6) +
															'...' +
															collection.userAddress.slice(
																collection.userAddress.length - 4,
																collection.userAddress.length
															)}
													</Typography>
												</Stack>
												<Box>
													<Typography variant="body1">
														{collection.listItem.length} items
													</Typography>
												</Box>
											</Stack>
										</Box>
									</Box>
								</Link>
							</Grid>
						))}
					</>
				)}
			</Grid>
		</>
	);
};

export default FeaturedCollection;
