import { Box, styled } from '@mui/material';

export const ResultItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',
	padding: '8px 0 8px 8px',
	transition: 'all 0.4s',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
			  }
			: {
					backgroundColor: 'rgba(250, 250, 250, 0.3)',
			  }),
	},
}));
