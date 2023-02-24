/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import TabSellMethod from './TabSellMethod/TabSellMethod';
import ReviewItem from './ReviewItem/ReviewItem';
// import FormSellFixPrice from 'components/Forms/FormSellFixPrice/FormSellFixPrice';
const SellItemPage = () => {
	return (
		<>
			<Container sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto', px: 2 }} maxWidth="xl">
				{/* <Typography variant="h3" fontWeight="600" sx={{ p: '2rem 0 0.5rem' }}>
					List Your Item For Sale
				</Typography> */}
				<Typography variant="h6" sx={{ pb: '1rem' }}>
					Choose the sale method
				</Typography>
				<TabSellMethod />
				{/* <Grid container spacing={3} mt={0.5}> */}
				{/* <Grid item xs={12} md={7}> */}
				{/* <TabSellMethod /> */}
				{/* <FormSellFixPrice /> */}
				{/* </Grid> */}
				{/* <Grid item xs={12} md={5}> */}
				{/* <Stack> */}
				{/* <Typography variant="h6" fontWeight="500" sx={{ pb: '1rem' }}> */}
				{/* Review */}
				{/* </Typography> */}
				{/* <ReviewItem /> */}
				{/* <SaleItemSummary collection={collection} currentItem={item} /> */}
				{/* </Stack> */}
				{/* </Grid> */}
				{/* </Grid> */}
				{/* <SaleItemMethod /> */}
				{/* <Grid container spacing={3} mt={0.5}>
					<Grid item xs={12} md={7}>
						<Grid container spacing={3}>
							<Grid item xs={12} lg={12} xl={12}>
								<SaleItemSetup listTokenPayment={listTokenPayment} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={5}>
						<Stack>
							<Typography variant="h6" fontWeight="500" sx={{ pb: '1rem' }}>
								Review
							</Typography>

							<SaleItemSummary collection={collection} currentItem={item} />
						</Stack>
					</Grid>
				</Grid> */}
			</Container>
		</>
	);
};

export default SellItemPage;
