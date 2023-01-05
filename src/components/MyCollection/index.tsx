import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import item from '../../assets/images/card/box.webp';

export default function MyCollection() {
	return (
		<Box sx={{ maxWidth: '1350px', mx: 'auto', pt: 16, pb: 4 }}>
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<Typography variant="h2" fontWeight={500}>
					My Collections
				</Typography>
			</Box>
			<Grid container spacing={1}>
				<Grid xs={6} sm={4} md={3} p={1}>
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
						<Box
							sx={{
								img: {
									width: '100%',
									minHeight: '300px',
									objectFit: 'cover',
									objectPosition: 'center',
									display: 'block',
								},
							}}
						>
							<img src={item} alt="collection" />
						</Box>
						<Box p={1.5}>
							<Typography variant="h6">Box 1</Typography>
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
									<Typography variant="body1">Adam</Typography>
								</Stack>
								<Box>
									<Typography variant="body1">2 items</Typography>
								</Box>
							</Stack>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
