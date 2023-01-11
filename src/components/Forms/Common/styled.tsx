import { styled, Typography } from '@mui/material';

export const ErrorMessage = styled(Typography)(({ theme }) => ({
	color: 'red',
	fontStyle: 'italic',
	fontSize: 14,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));

export const Asterisk = styled('span')(({ theme }) => ({
	color: 'red',
	'&::before': {
		content: '"*"',
		fontSize: 18,
	},
}));
