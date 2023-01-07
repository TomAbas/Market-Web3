/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { ItemImage } from 'components/Marketplace/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import item from '../../../../assets/images/card/box.webp';

export default function Items() {
	return (
		<Grid container spacing={1}>
			<Grid xs={6} sm={4} md={3} p={1}>
				<Link
					href=""
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
								<img src={item} alt="collection" />
							</Box>
						</ItemImage>

						<Box py={1.5}>
							<Typography variant="h6">Box</Typography>
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
									<Typography variant="body1">1 items</Typography>
								</Box>
							</Stack>
						</Box>
					</Box>
				</Link>
			</Grid>
		</Grid>
	);
}
