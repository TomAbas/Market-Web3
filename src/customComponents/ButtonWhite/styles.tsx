import { styled, Button } from '@mui/material';

export const ButtonStyled = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	width: '100%',
	cursor: 'pointer',
	borderRadius: '12px',
	outline: 'none',
	background: '#fff',
	transition: '0.5s ease all',
	fontSize: 16,
	textTransform: 'none',
	fontWeight: 500,
	fontStyle: 'italic',
	backdropFilter: 'filter(blur(4px))',
	border: '1.5px solid #E7E8EC',
	padding: '8px 32px',
	color: '#5A5D79',
	'&:focus': {
		outline: 'none',
	},

	'&:hover': {
		background: '#007aff',
		color: '#fff',
		boxShadow: '0px 3px 6px rgba(13, 16, 45, 0.3)',
		borderColor: theme.palette.primary.light,
	},

	'&:disabled': {
		backgroundImage: 'unset',
		background: '#919EAB',
		borderColor: '#919EAB',
		color: 'black',
	},
}));
