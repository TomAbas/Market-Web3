import { styled, Box } from '@mui/material';

export const ModalOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0,0,0,0.1)',
	backdropFilter: 'blur(8px)',
	zIndex: 1000,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export const ModalStyle = styled(Box)(({ theme }) => ({
	position: 'relative',
	boxSizing: 'border-box',
	width: '70vw',
	maxWidth: '760px',
	maxHeight: '90vh',
	borderRadius: '22px',
	alignSelf: 'center',
	backgroundColor: '#fff',

	'@media screen and (max-height: 1100px)': {
		maxHeight: '75vh',
	},
	'@media screen and (max-height: 800px)': {
		maxHeight: '70vh',
	},
	'@media screen and (max-width: 960px)': {
		width: '65vw',
	},
	'@media screen and (max-width: 720px)': {
		width: '85vw',
		maxHeight: '80vh',
		margin: 0,
	},
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
	width: '100%',
	position: 'relative',
	height: '4rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

export const LeftHeader = styled(Box)(({ theme }) => ({
	cursor: 'pointer',
	position: 'absolute',
	top: '1rem',
	left: '1rem',
	lineHeight: 1,
}));

export const MainHeader = styled(Box)(({ theme }) => ({
	alignSelf: 'center',
	fontSize: '32px',
	padding: '10px 40px',
	textAlign: 'center',
	'@media screen and (max-width: 500px)': {
		fontSize: '20px',
	},
}));

export const ModalClose = styled(Box)({
	cursor: 'pointer',
	position: 'absolute',
	zIndex: 1001,
	top: '20px',
	right: '1rem',
	':hover': {
		opacity: 0.5,
	},
});

export const WrapperChildren = styled(Box)({
	padding: '0 1rem',
});
