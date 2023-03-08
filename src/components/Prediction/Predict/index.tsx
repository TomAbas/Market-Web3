import { Container, Box, Grid, Typography, Radio, Stack } from '@mui/material';

const predict = () => {
	return (
		<Container
			sx={{
				background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',
				minHeight: '100vh',
				paddingTop: 20,
			}}
		>
			<Box sx={{}}>
				<img
					src="https://s3-alpha-sig.figma.com/img/b645/ab96/f6663ab1ba18578e59d3998e04fa0322?Expires=1678060800&Signature=kjwph5ohqTCTGnXMSFh8xwOpRo2v7BixNSZ3zo8nn4rRsSRke7QiP-Fww2W2k4f~-QBrRlUg7H9wS~kk9BeI-JU4q5LgUYo0ez4i5SZ03taO-5fsGSPOMvMXEo0fssrzv292C2nPjPkJgVtXTNhIT34ttVFMv3suMSKwTfLBsUfAQQgZ7j0s0nBMYcliAXl5s3cxCMY6E3VZbCKYHnb2ldpcaFkjbt9-54ZZeuRMp~4dCUL1qsncKWSmy200rwNDtPRwSVrZjmPvzluxEVE-vgEPKGjSz2plLfF9bM~ity4hOFYC43hqAhV0tTyOVc5UiOvLtTkoyEkw9vRxjjeRsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
					alt=""
					style={{ width: 100 }}
				/>
				<Stack
					sx={{
						backgroundColor: 'rgba(255, 201, 63, 0.3)',
						position: 'absolute',
						top: '165px',
						right: '1120px',
						width: 110,
						textAlign: 'center',
						p: 1,
					}}
				>
					Politics
				</Stack>
				<Stack
					sx={{
						position: 'absolute',
						top: '165px',
						right: '1000px',
						width: 110,
						textAlign: 'center',
						p: 1,
					}}
				>
					$ 2 000.00 Vol
				</Stack>
				<Stack
					sx={{
						position: 'absolute',
						top: '165px',
						right: '850px',
						width: 110,
						textAlign: 'center',
						p: 1,
					}}
				>
					$ 52 000.00 Liq
				</Stack>
				<Stack
					sx={{
						position: 'absolute',
						top: '165px',
						right: '700px',
						width: 110,
						textAlign: 'center',
						p: 1,
					}}
				>
					Expires 20/02/2023
				</Stack>
				<Stack
					sx={{
						position: 'absolute',
						top: '235px',
						right: '682px',
						textAlign: 'center',
						fontWeight: 700,
						fontSize: '26px',
					}}
				>
					Will Trump be president of USA at 30-03
				</Stack>
			</Box>
			<Grid xs={2} lg={2} xl={6}>
				<Box
					sx={{
						m: 1,
						p: 2,
						border: '1.5px solid #e7e8ec',
						borderRadius: 2,
						marginTop: 5,
					}}
				>
					{' '}
					<Box
						sx={{
							padding: 1,
							width: '45%',
						}}
					>
						Buy
					</Box>
					<Box
						sx={{
							marginLeft: '600px',
							marginTop: '-36',
							padding: 1,
							width: '45%',
						}}
					>
						Sell
					</Box>
					<Box></Box>
					<Typography sx={{ fontSize: 14 }} fontWeight={700}></Typography>
					<Box sx={{ width: '100%', marginTop: '10px' }}></Box>
					<Typography
						sx={{
							background: 'rgba(0, 255, 133, 0.1)',
							width: '45%',
							marginTop: '10px',
							fontSize: 14,
						}}
					>
						<Radio
							value="check"
							name="radio-buttons"
							sx={{
								width: '1px',
								height: '1px',
								'.css-1hbvpl3-MuiSvgIcon-root': {
									height: '10px',
								},
								'.css-11zohuh-MuiSvgIcon-root': {
									color: '#01FF57',
									marginTop: '-7px',
								},
							}}
						/>
						Yes 77.77%
						<Typography
							sx={{
								background: 'rgba(255, 1, 1, 0.1)',
								width: '100%',
								marginLeft: '131px',
								fontSize: 14,
								marginTop: '-22px',
							}}
						>
							<Radio
								value="check"
								name="radio-buttons"
								sx={{
									width: '1px',
									height: '1px',
									'.css-1hbvpl3-MuiSvgIcon-root': {
										height: '10px',
									},
									'.css-11zohuh-MuiSvgIcon-root': {
										color: '#FF4E4E',
										marginTop: '-7px',
									},
								}}
							/>
							No 22.23%
						</Typography>
					</Typography>
					<Typography sx={{ fontSize: 14, marginTop: '10px' }}>Total Volume</Typography>
					<Typography
						sx={{
							width: '45%',
							marginLeft: '131px',
							marginTop: '-22px',
							fontSize: 14,
						}}
					>
						9.999 BTC
					</Typography>
					<Typography sx={{ fontSize: 14, marginTop: '10px' }}>Liquidity</Typography>
					<Typography
						sx={{
							width: '45%',
							marginLeft: '131px',
							marginTop: '-22px',
							fontSize: 14,
						}}
					>
						999.001 BTC
					</Typography>
					<Box
						sx={{
							marginTop: '10px',
							border: '1px solid gainsboro',
							borderRadius: 2,
							textAlign: 'center',
							padding: 1,
						}}
					>
						Predict
					</Box>
				</Box>
			</Grid>
		</Container>
	);
};
export default predict;
