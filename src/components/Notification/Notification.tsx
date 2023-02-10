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
					fontWeight="700"
					color="red"
					fontStyle="italic"
					textAlign="center"
				>
					We are currently under maintenance our systems
				</Typography>
				<Typography
					variant="h6"
					fontWeight="700"
					color="red"
					fontStyle="italic"
					textAlign="center"
				>
					Today, we will reset our database to bring better experiment to our users
				</Typography>
				<Typography
					variant="h6"
					fontWeight="700"
					color="red"
					fontStyle="italic"
					textAlign="center"
				>
					Please, come back later
				</Typography>
			</Stack>
		</>
	);
};

export default Notification;
