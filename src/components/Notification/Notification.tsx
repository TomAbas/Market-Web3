import { Typography, Stack } from '@mui/material';
import React from 'react';

const Notification = () => {
	return (
		<>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{ padding: '20px 50px', background: 'white' }}
			>
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
		</>
	);
};

export default Notification;
