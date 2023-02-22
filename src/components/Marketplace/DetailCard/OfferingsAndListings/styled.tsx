import { styled, Box, Typography } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	padding: 18,
	background: '#fff',
	border: '1.5px solid #E7E8EC',
}));

export const OrderListWrapper = styled(Box)(({ theme }) => ({
	maxHeight: 200,
	overflow: 'auto',

	'&::-webkit-scrollbar': {
		display: 'block',
		width: 3,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},
}));

export const OptionItem = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.text.secondary,

	'&:hover': {
		color: theme.palette.text.primary,
	},

	'&.active': {
		textDecoration: 'underline !important',
		color: theme.palette.text.primary,
	},
}));

export const OrderList = styled(Box)(({ theme }) => ({
	maxHeight: 400,
	overflow: 'auto',

	[theme.breakpoints.down('lg')]: {
		maxHeight: 350,
	},

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '0px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},
}));
