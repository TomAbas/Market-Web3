import { styled, Stack, Box } from '@mui/material';

export const SelectOptionBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	cursor: 'pointer',
	borderRadius: '0 10px 10px 0 ',
	flexShrink: 0,
	borderLeft: '1px solid #E7E8EC',
	background: 'transparent',

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundColor: theme.palette.primaryLight.main,
	// 	  }
	// 	: {
	// 			backgroundColor: theme.palette.primary.main,
	// 	  }),
}));

export const DropDownOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	display: 'none',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	// backgroundColor: 'black',
	zIndex: 2,

	'&.active': {
		display: 'block',
	},
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	top: '110%',
	left: 0,
	width: '100%',
	maxHeight: '300px',
	borderRadius: '10px 0 0 10px',
	zIndex: 999,
	overflowY: 'auto',
	background: 'transparent',

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '3px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#E7E8EC',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: theme.palette.primary.light,
		borderRadius: '5px',
	},
	'&.active': {
		display: 'block',
	},
}));

export const ListOption = styled(Stack)(({ theme }) => ({}));

export const OptionItem = styled(Stack)(({ theme }) => ({
	cursor: 'pointer',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({}));