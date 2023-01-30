/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Stack, Link, Box } from '@mui/material';

export const DropdownMenu = styled('div')(({ theme }) => ({
	opacity: 0,
	display: 'none',
	transition: 'all 0.1s',
	zIndex: 100,
	maxHeight: '190px',
	overflowY: 'scroll',
	width: '100%',

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
