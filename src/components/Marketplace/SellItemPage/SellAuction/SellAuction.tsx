import { Grid, Stack, Typography, Box } from '@mui/material';
import FormCreateAuction from 'components/Forms/FormCreateAuction/FormCreateAuction';
import ReviewItem from '../ReviewItem/ReviewItem';
const SellAuction = () => {
	return (
		<>
			<Box>
				<Typography variant="h3">Create Auction</Typography>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12} md={7}>
					<FormCreateAuction />
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

export default SellAuction;
