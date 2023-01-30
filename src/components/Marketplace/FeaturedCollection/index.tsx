import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { ItemImage } from './styled';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
	collections: any[];
}
const FeaturedCollection: React.FC<Props> = ({ collections }) => {
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
				{collections.map((collection: any, index: any) => (
					<Grid
						xs={6}
						sm={4}
						md={3}
						p={1}
						key={index}
						onClick={() => {
							handleCollectionDetail(collection.creator, collection.name);
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
										<img src={collection.image} alt="collection" />
									</Box>
								</ItemImage>

								<Box py={1.5}>
									<Typography variant="h6">{collection.name}</Typography>
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
												<img src={collection.ownerAva} alt="collection" />
											</Box>
											<Typography variant="body1">
												{collection.creator.slice(0, 6) +
													'...' +
													collection.creator.slice(
														collection.creator.length - 4,
														collection.creator.length
													)}
											</Typography>
										</Stack>
										<Box>
											<Typography variant="body1">
												{collection.items.length} items
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
};

export default FeaturedCollection;
