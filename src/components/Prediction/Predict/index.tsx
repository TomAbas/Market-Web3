import { Container, Box, Typography, Stack } from '@mui/material';
import ModalChart from '../chartCard';

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
				<Stack direction={'row'}>
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
			<hr />
			<Typography>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
				euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
				minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
				aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
				vulputate velit esse molestie consequat, vel illum dolore eu feugiat{' '}
			</Typography>
			<Typography sx={{ fontWeight: 700 }}>Show More</Typography>

			<ModalChart />
		</Container>
	);
};
export default predict;
