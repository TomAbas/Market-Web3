import { styled, Typography, Box } from '@mui/material';

export const YaxisTitle = styled(Typography)(({}) => ({
	position: 'absolute',
	top: '-10px',
	left: 15,
}));

export const FilterButton = styled(Box)(({}) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '8px 8px',
	borderRadius: '12px',
	background: '#fff',
	border: '1px solid #E7E8EC',
	cursor: 'pointer',
	transition: 'all 0.2s',
	width: 'fitContent',
	height: '40px',
	gap: '8px',

	'&:hover': {
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryDark.backgroundCard,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),

		transform: 'scale(0.97)',
	},

	'&.active': {
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			backgroundColor: theme.palette.primaryDark.backgroundCard,
		// 	  }
		// 	: { backgroundColor: theme.palette.primary.main }),
		background: 'rgb(0, 122, 255)',
		borderColor: 'rgb(0, 122, 255)',
		color: '#fff',
	},
}));

export const ButtonShow = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: '#fff',

	'&:hover': {
		color: '#F5F5F7',
	},
}));

export const FilterWrapper = styled(Box)(({ theme }) => ({
	width: '400px',
	gap: '10px',
}));
