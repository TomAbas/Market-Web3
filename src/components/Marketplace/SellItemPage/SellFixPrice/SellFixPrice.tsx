import { Grid, Stack, Typography, Box } from '@mui/material';
import FormSellFixPrice from 'components/Forms/FormSellFixPrice/FormSellFixPrice';
import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';

const SellFixPrice = () => {
	return (
		<>
			<Box>
				<Typography variant="h3">Create Order</Typography>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={7}>
					<FormSellFixPrice />
				</Grid>
				<Grid item xs={12} md={5}>
					<Stack>
						<Typography variant="h6" fontWeight="500" sx={{ pb: '1rem' }}>
							Review
						</Typography>
						<ReviewItem />
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default SellFixPrice;
