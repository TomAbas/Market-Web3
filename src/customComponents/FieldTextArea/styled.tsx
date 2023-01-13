import { styled } from '@mui/material';

export const TextArea = styled('textarea')({
	display: 'block',
	border: '1px solid #E7E8EC',
	outline: 'none',
	width: '100%',
	borderRadius: 5,
	padding: '15px',
	fontSize: 16,
	background: '#fff',
	fontStyle: 'italic',
	fontFamily: 'Montserrat,sans-serif',

	'&::placeholder': {
		fontSize: 16,
		fontWeight: 'normal',
		opacity: 0.5,
		fontStyle: 'italic',
		fontFamily: 'Montserrat,sans-serif',
	},
});
