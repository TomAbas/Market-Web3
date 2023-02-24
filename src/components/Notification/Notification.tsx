/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Stack, Button } from '@mui/material';
import ModalFaucetCoin from 'components/ModelFaucetCoin';
import React from 'react';

const Notification = () => {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	return (
		<Stack
			direction={'row'}
			sx={{ background: 'white' }}
			justifyContent="center"
			alignItems={'center'}
		>
			<Stack justifyContent="center" alignItems="center" sx={{ padding: '20px 50px' }}>
				<Typography
					variant="h6"
					fontWeight="500"
					color="red"
					fontStyle="italic"
					textAlign="center"
					fontSize="16px"
				>
					Thank you all for your support for a while in our demo version.
				</Typography>
				<Typography
					variant="h6"
					fontWeight="500"
					color="red"
					fontStyle="italic"
					textAlign="center"
					fontSize="16px"
				>
					We would like to inform that we update to the testnet version and your
					information is reset. Sorry for the inconvenience!
				</Typography>
			</Stack>
			{/* <Button
				variant="contained"
				sx={{ color: 'white', px: 2, height: 50 }}
				onClick={handleOpen}
			>
				Faucet
			</Button>
			<ModalFaucetCoin
				title="Faucet Of Test Coins"
				warning="We only support faucet once time only"
				subtitle="Get 100 test coins for Aptos Marketplace testing, test coins will be sent to your wallet."
				open={open}
				closeModal={handleClose}
			></ModalFaucetCoin> */}
		</Stack>
	);
};

export default Notification;
