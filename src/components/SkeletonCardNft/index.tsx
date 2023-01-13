import React from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { ItemCardStyle, ItemContent, ItemImage } from '../Marketplace/CardNFT/styled';
const SkeletonCardNft = () => {
	return (
		<>
			<Grid xs={6} sm={4} md={3} p={1}>
				<ItemCardStyle sx={{ boxShadow: 0 }}>
					<Box sx={{ p: 1.5, fontStyle: 'italic' }}>
						{/* Item image */}
						<Skeleton variant="rectangular" width="100%" height="100%">
							<ItemImage></ItemImage>
						</Skeleton>
						{/* Item info */}

						<ItemContent sx={{ pt: 4, height: '120px' }}>
							<Skeleton width="100%">
								<Box sx={{ height: '21px' }}>
									<Typography fontSize="14px"></Typography>
								</Box>
							</Skeleton>
							<Box>
								<Skeleton width="100%" height="100%"></Skeleton>
							</Box>
						</ItemContent>
					</Box>
				</ItemCardStyle>
			</Grid>
		</>
	);
};

export default SkeletonCardNft;
