import { Box, styled, Typography } from '@mui/material';

export const GlobalSearchComponent = styled(Box)(({ theme }) => ({
	// marginLeft: 'auto',
	...(theme.palette.mode === 'light'
		? {
				// backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				// backgroundColor: theme.palette.primary.main,
		  }),
	borderRadius: 10,
	flexGrow: 2,
}));

export const ResultTitle = styled(Typography)(({ theme }) => ({
	padding: '8px 0 8px 8px',
	fontWeight: 600,
}));

export const ButtonAllResults = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	padding: '0.25rem',
	fontWeight: 400,
	cursor: 'pointer',
	transition: 'all 0.2s',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
			  }
			: { backgroundColor: 'rgba(250, 250, 250, 0.3)' }),
	},
}));
