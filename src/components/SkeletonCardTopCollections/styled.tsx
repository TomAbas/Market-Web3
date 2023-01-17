import { styled, Box } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: '8px',
	padding: 10,
	// '&:hover': {
	// 	...(theme.palette.mode === 'light'
	// 		? {
	// 				boxShadow: theme.customShadows.cardLightHover,
	// 		  }
	// 		: {
	// 				boxShadow: theme.customShadows.cardDarkHover,
	// 		  }),
	// },

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			boxShadow: theme.customShadows.cardLight,
	// 			background: theme.palette.primaryLight.lighter,
	// 	  }
	// 	: {
	// 			// backgroundColor: theme.palette.primary.dark,
	// 			backgroundImage: theme.palette.gradients.third,
	// 	  }),
}));

export const ErrorBoundaryContainer = styled('div')(({ theme }) => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 15,
	textAlign: 'center',
}));

export const ErrorBoundaryWrapper = styled('div')(({ theme }) => ({
	maxWidth: 300,
	borderRadius: '10px',
	padding: 10,
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			background: theme.palette.primaryLight.dark,
	// 	  }
	// 	: {
	// 			background: theme.palette.primary.main,
	// 	  }),
}));
