/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Stack, Typography, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Collection } from 'models/collection';
import { ItemImage } from './styled';
import NoMaxWidthTooltip from 'customComponents/LongToolTip/LongToolTip';
import { displayAddress, displayUserFullName } from 'utils/formatDisplay';

interface Props {
	collection: Collection;
}
const CardCollection: React.FC<Props> = ({ collection }) => {
	const navigate = useNavigate();
	function handleCollectionDetail(collectionId: string) {
		navigate(`/collection-detail/${collectionId}`);
	}
	function handleCreatorDetail(userAddress: string) {
		navigate(`/profile?address=${userAddress}`);
	}
	return (
		<>
			<Grid item xs={6} sm={4} md={3} p={1}>
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
						<ItemImage
							onClick={() => {
								handleCollectionDetail(collection._id);
							}}
						>
							<Box className="main-img">
								<img src={collection.logo} alt="collection" />
							</Box>
						</ItemImage>

						<Box py={1.5}>
							<Typography
								variant="subtitle1"
								fontWeight={500}
								noWrap
								sx={{ cursor: 'pointer', flex: '1' }}
								onClick={() => {
									handleCollectionDetail(collection._id);
								}}
							>
								<NoMaxWidthTooltip
									title={displayUserFullName(collection?.collectionName)}
								>
									<Typography fontWeight="500" variant="subtitle1" noWrap>
										{collection.collectionName}
									</Typography>
								</NoMaxWidthTooltip>
							</Typography>
							<Stack
								mt={1}
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								gap={1}
							>
								<Stack
									direction="row"
									gap={1}
									alignItems="center"
									onClick={() => handleCreatorDetail(collection.userAddress)}
								>
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
										<img src={collection?.ownerInfo.avatar} alt="collection" />
									</Box>
									<Typography variant="body1">
										{displayAddress(collection.userAddress)}
									</Typography>
								</Stack>
								<Box>
									<Typography variant="body1">
										{collection.listItem.length}{' '}
										{collection.listItem.length > 1 ? 'items' : 'item'}
									</Typography>
								</Box>
							</Stack>
						</Box>
					</Box>
				</Link>
			</Grid>
		</>
	);
};

export default CardCollection;
