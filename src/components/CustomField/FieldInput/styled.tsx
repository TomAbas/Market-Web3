import { styled } from '@mui/material';

export const Input = styled('input')(({ theme }) => ({
	display: 'block',
	// border: 'none',
	borderRadius: '12px',
	padding: '15px',
	outline: 'none',
	width: '100%',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '16px',
	color: '#131740',
	fontStyle: 'italic',
	background: '#fff',
	border: '1px solid #E7E8EC',
	fontFamily: 'Montserrat,sans-serif',
	// boxShadow: '2px 2px 3px 0 rgba(0,0,0,0.2)',

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			background: theme.palette.primaryLight.main,
	// 	  }
	// 	: {
	// 			background: theme.palette.primary.dark,
	// 	  }),

	'&::placeholder': {
		color: '#131740',
		fontSize: '16px',
		fontWeight: 500,
		opacity: 0.4,
		fontStyle: 'italic',
		fontFamily: 'Montserrat,sans-serif',
	},
}));
