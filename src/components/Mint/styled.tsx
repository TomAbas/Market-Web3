import { Box, styled } from '@mui/material';

export const InputItem = styled(Box)({
	marginTop: 16,
	input: {
		display: 'block',
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

		'&::placeholder': {
			color: '#131740',
			fontSize: '16px',
			fontWeight: 500,
			opacity: 0.4,
			fontStyle: 'italic',
			fontFamily: 'Montserrat,sans-serif',
		},
	},
});

export const InputTitle = styled('h6')({
	fontSize: '18px',
	marginBottom: '8px',
});