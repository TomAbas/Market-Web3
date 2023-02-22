import { styled, Box } from '@mui/material';

export const OrderListWrapper = styled(Box)(({ theme }) => ({
	height: 200,
	paddingBottom: 10,
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

export const OrderList = styled(Box)(({ theme }) => ({
	maxHeight: 400,
	overflow: 'auto',

	[theme.breakpoints.down('lg')]: {
		maxHeight: 350,
	},

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '3px',
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
