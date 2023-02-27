import { Box, Stack, styled } from '@mui/material';

export const SearchGroup = styled(Stack)(({ theme }) => ({
	borderRadius: 12,
	maxWidth: '400px',
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: 'rgba(255, 255, 255, 0.5)',
				boxShadow: '2px 3px 2px 0 rgba(0,0,0,0.2)',
				// backdropFilter: 'blur(10px)',
		  }
		: {
				// backgroundColor: theme.palette.primary.main,
				backgroundColor: 'rgba(177, 218, 255, 0.45)',
				backdropFilter: 'blur(6px)',

				// backgroundColor: 'red',
		  }),
	'&.color': {
		...(theme.palette.mode === 'light'
			? {
					backgroundColor: 'rgba(255, 255, 255, 1)',
					boxShadow: '2px 3px 2px 0 rgba(0,0,0,0.2)',
					// backdropFilter: 'blur(10px)',
			  }
			: {
					// backgroundColor: theme.palette.primary.main,
					backgroundColor: '#89AED0',
			  }),
	},
}));

export const DropDownContentBS = styled(Box)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	top: '120%',
	transition: 'all 0.2s',
	width: '100%',
	maxWidth: '400px',
	zIndex: 100,
	borderRadius: 12,
	overflow: 'hidden',
	// boxShadow: theme.customShadows.z24,

	boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#fff',
				// backdropFilter: 'blur(10px)',
		  }
		: {
				// backgroundImage: theme.palette.gradients.modal,
				// border: `1px solid ${theme.palette.primary.main}`,
				backgroundColor: '#89AED0',
				backdropFilter: 'blur(6px)',
		  }),

	'&.active': {
		display: 'block',
		// overflowY: 'scroll',
		// height: '80vh',
		// '&::-webkit-scrollbar': {
		// 	width: 0,
		// },
	},
}));
