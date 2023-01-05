import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import item from '../../../assets/images/card/box.webp';

export default function DetailCard() {
	return (
		<>
			<Box sx={{ pt: 16, pb: 4, maxWidth: '1440px', mx: 'auto' }}>
				<Stack direction="row">
					<Box sx={{ width: '50%', img: { width: '100%' } }}>
						<img src={item} alt="item" />
					</Box>
					<Stack gap="10px" sx={{ width: '50%' }}>
						<Typography variant="h5" fontWeight={500}>
							Box 1
						</Typography>
						<Typography variant="body1">Owner: Adam</Typography>
						<Typography variant="body1">Address: 0x000000...000</Typography>
						<Typography variant="body1">Price: 0.1 APT</Typography>
						<Box
							sx={{
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 500,
									background: '#fff',
									fontSize: '20px',
									cursor: 'pointer',
									fontFamily: 'Montserrat, sans-serif !important',
									fontStyle: 'italic !important',
									width: '180px',
									'&:hover': {
										background: '#007aff',
										borderColor: 'transparent',
										color: '#fff',
									},
								},
							}}
						>
							<button>Offer</button>
						</Box>
					</Stack>
				</Stack>
				{/* <Box mt={3}>
					<Box sx={{ textAlign: 'center', mb: 3 }}>
						<Typography variant="h4" fontWeight={500}>
							History
						</Typography>
					</Box>
					<Stack gap="10px">
						<Stack
							direction="row"
							gap={1}
							alignItems="center"
							sx={{
								padding: '6px 24px',
								background: '#fff',
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
							}}
						>
							<Box
								sx={{ img: { width: '42px', height: '42px', borderRadius: '50%' } }}
							>
								<img src={item} alt="avatar" />
							</Box>
							<Box>
								<Typography variant="body1">Address: 0x000000...000</Typography>
							</Box>
						</Stack>
					</Stack>
				</Box> */}
			</Box>
		</>
	);
}
