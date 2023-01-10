/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import FilterCollection from 'components/Marketplace/FilterCollection';
import { ItemImage } from 'components/Marketplace/styled';
import { useNavigate } from 'react-router-dom';
import item from '../../../../assets/images/card/box.webp';

export default function Items({ collections }: { collections: any }) {
	let navigate = useNavigate();
	const handleCollectionDetail = (creator: string, collection: string) => {
		//encodeURIComponent
		navigate(
			`/collection-detail?creator=${encodeURIComponent(
				creator
			)}&collection=${encodeURIComponent(collection)}`
		);
	};
	return (
		<>
			<FilterCollection />
			<Grid container spacing={1}>
				{collections.map((collection: any, index: any) => (
					<Grid
						xs={6}
						sm={4}
						md={3}
						p={1}
						key={index}
						onClick={() => {
							handleCollectionDetail(
								collection[0].split('*/////*')[1],
								collection[0].split('*/////*')[0]
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
												{collection[0].split('*/////*')[1].slice(0, 6) +
													'...' +
													collection[0]
														.split('*/////*')[1]
														.slice(
															collection[0].split('*/////*')[1]
																.length - 4,
															collection[0].split('*/////*')[1].length
														)}
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
						</Link>
					</Grid>
				))}
			</Grid>
		</>
	);
}
