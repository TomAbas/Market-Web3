import React, { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
const Error = () => {
	const navigate = useNavigate();
	const error: any = useRouteError();

	useEffect(() => {
		navigate('/404');
	}, []);
	return (
		<Container maxWidth="lg" sx={{ height: '100vh' }}>
			<Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
			</Stack>
		</Container>
	);
};

export default Error;
