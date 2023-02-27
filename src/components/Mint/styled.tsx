import { Box, styled } from '@mui/material';

export const InputItem = styled(Box)(({ theme }) => ({
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
	'& p': {
		marginTop: '4px',
		color: 'red',
	},
	[theme.breakpoints.down('md')]: {
		margin: '16px 5px',
	},
}));

export const InputTitle = styled('h6')({
	fontSize: '18px',
	marginBottom: '8px',
	'& span': {
		marginLeft: '4px',
		color: 'red',
	},
});
export const InputSubTitle = styled('p')({
	fontSize: '18px',
	marginBottom: '8px',
	opacity: 0.8,
});

export const InputImage = styled(Box)({
	height: '300px',
	position: 'relative',
	'& p': {
		marginTop: '4px',
		color: 'red',
	},
});
