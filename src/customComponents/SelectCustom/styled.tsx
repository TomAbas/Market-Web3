import { styled, Stack, Box } from '@mui/material';

export const SelectOptionBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	cursor: 'pointer',
	borderRadius: '12px',
	padding: '10px 5px 10px 8px',
	flexShrink: 0,
	border: '1px solid #E8E8E8',
	background: '#fff',
}));

export const DropDownOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	display: 'none',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	// backgroundColor: 'black',
	zIndex: 1,

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
	borderRadius: 10,
	zIndex: 100,
	overflowY: 'auto',
	background: '#fff',
	border: '1px solid #E8E8E8',
	color: '#1d1d1f',
	fontWeight: 500,

	'&::-webkit-scrollbar': {
		display: 'block',
		width: '0px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},
	'&.active': {
		display: 'block',
	},
}));

export const ListOption = styled(Stack)(({ theme }) => ({}));

export const OptionItem = styled(Stack)(({ theme }) => ({
	paddingLeft: 5,
	paddingRight: 5,
	cursor: 'pointer',
	fontWeight: 500,
	'&:hover': {
		background: '#fff',
	},
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
	padding: '10px 5px 10px 8px',
}));
